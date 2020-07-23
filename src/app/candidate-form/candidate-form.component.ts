import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatesService } from '../services/candidates.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CandidateProfileService } from '../services/candidate-profile.service';
import { SkillsChipListComponent } from '../skills-chip-list/skills-chip-list.component';
import { CONTACT_REGEX_PATTERN } from '../helpers/constants';
import { convertBlobToFile } from '../helpers/file-helper';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  form;
  @ViewChild(SkillsChipListComponent) skillsChipList: SkillsChipListComponent;
  selectedSkills: string[] = [];
  selectedFile: File;
  candidateId;
  candidateData;
  responsePending : boolean = false;

  constructor(private builder: FormBuilder, private authService : AuthService,
    private candidatesService : CandidatesService, private candidateProfileService : CandidateProfileService,
    private router : Router, private route : ActivatedRoute,
    private snackBar : MatSnackBar
     ) { 
      this.form = builder.group({
        firstName : ['', Validators.required], lastName : ['', Validators.required],
        email : ['', [ Validators.required, Validators.email]],
        contact : ['', [Validators.required, Validators.pattern(CONTACT_REGEX_PATTERN)]],
        address : ['', Validators.required], preferredLoc : ['', Validators.required],
        ectc : ['', [Validators.required, Validators.min(0)]], ctct : ['', [Validators.required, Validators.min(0)]],
        source : ['', Validators.required],
        fileInput : [''],
        skills : ['']
      });   
  }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get("id");
    if(this.candidateId !== null) { // Pre populate data
      this.candidatesService.getById(this.candidateId).subscribe((candidate) => {
        // Fetch candidate data
        this.candidateData = candidate as any;
        // Fetch CV
        let response = from(this.candidateProfileService.downloadCV(this.candidateId));
        let file : Blob;
        response.subscribe((result : any) => {
          file = result.cvFile || null;
          this.selectedFile = (file) ? convertBlobToFile(file, this.candidateData.firstName + "_CV.pdf") : null;
          this.form.setValue({
            firstName : this.candidateData.firstName, lastName : this.candidateData.lastName,
            contact : this.candidateData.contact, email : this.candidateData.email,
            address : this.candidateData.address, preferredLoc : this.candidateData.preferredLoc,
            ectc : this.candidateData.ectc, ctct : this.candidateData.ctct,
            source : this.candidateData.source, fileInput : '', skills : ''
          });
          this.selectedSkills = this.candidateData.skillSet.map(skill => skill.skillName);
          this.email.disable();
        });
      });
    }
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }

  processForm() {
    let selectedSkills;
    if(this.skillsChipList.allSkills) {
      selectedSkills = (this.skillsChipList.allSkills.filter(skill => 
        this.skillsChipList.selectedSkills.includes(skill.name))).map(skill => skill.mapFields());
    }
    let processedFormData = Object.assign({}, this.form.value);
    processedFormData.skillSet = selectedSkills;
    delete processedFormData.skills;
    delete processedFormData.fileInput;
    return processedFormData;
  }

  async save() {
    this.responsePending = true;
    let processedFormData = this.processForm();
    let response : any;
    if(this.candidateId === null) { // Create new candidate and assign recruiter
      processedFormData.recruiter = { id : this.authService.userLoggedIn().id };
      response = await this.candidatesService.saveOrUpdateCandidate(processedFormData, this.selectedFile, true);
    } else {
      let updateBody = Object.assign({}, this.candidateData);
      Object.assign(updateBody, processedFormData);
      console.log(updateBody);
      response = await this.candidatesService.saveOrUpdateCandidate(updateBody, this.selectedFile, false);
    }
    this.responsePending = false;
    if(response.code !== 200){
      let errorMessage = "Something went wrong";
      switch(response.code) {
        case 409 : errorMessage = "Candidate already exists"; break;
        case 404 : errorMessage = "Candidate not found"; break;
        case 415 : errorMessage = "Could not upload CV"; break;
      }
      this.snackBar.open(errorMessage, "Dismiss", { duration: 2000 });
    } else {
      this.snackBar.open("Successfully saved candidate", "Dismiss", { duration: 2000, });
      this.router.navigateByUrl('/candidates');
    }
  }

  get firstName() { return this.form.get('firstName') }
  get lastName() { return this.form.get('lastName') }
  get email() { return this.form.get('email') }
  get contact() { return this.form.get('contact') }
  get address() { return this.form.get('address') }
  get preferredLoc() { return this.form.get('preferredLoc') }
  get ectc() { return this.form.get('ectc') }
  get ctct() { return this.form.get('ctct') }
  get source() { return this.form.get('source') }
  get fileInput() { return this.form.get('fileInput') }
  get skills() { return this.form.get('skills') }
}
