import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  form;
  selectedFile: File;
  constructor(private builder: FormBuilder, 
    private candidatesService : CandidatesService,
    private router : Router ) { 
    let pattern = "^(\\+\\d{1,3}[- ]?)?0?[7-9]{1}\\d{9}$";
    this.form = builder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [ Validators.required, Validators.email]],
      contact : ['', [Validators.required, Validators.pattern(pattern)]],
      address : ['', Validators.required],
      preferredLoc : ['', Validators.required],
      ectc : ['', [Validators.required, Validators.min(0)]],
      ctct : ['', [Validators.required, Validators.min(0)]],
      source : ['', Validators.required],
      fileInput : ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    this.candidatesService.saveCandidate(this.form.value, this.selectedFile);
    this.router.navigateByUrl('/candidates');
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get contact() {
    return this.form.get('contact');
  }
  get address() {
    return this.form.get('address');
  }
  get preferredLoc() {
    return this.form.get('preferredLoc');
  }
  get ectc() {
    return this.form.get('ectc');
  }
  get ctct() {
    return this.form.get('ctct');
  }
  get source() {
    return this.form.get('source');
  }
  get fileInput() {
    return this.form.get('fileInput');
  }

}
