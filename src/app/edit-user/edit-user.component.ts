import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form;
  userData = {
    firstName : '',
    lastName : '',
    contact : '',
    isActive : ''
  };
  subordinateProfile : boolean = true;
  constructor(private builder: FormBuilder,
    private route : ActivatedRoute,
    private usersService : UsersService,
    private snackbar : MatSnackBar,
    private router : Router,
    private authService : AuthService ) { 
      let pattern = "^(\\+\\d{1,3}[- ]?)?0?[7-9]{1}\\d{9}$";
      this.form = this.builder.group({
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        contact : ['', [Validators.required, Validators.pattern(pattern)]],
        isActive : '' 
      });
  }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get("id");
    if(userId === null) {
      userId = this.authService.userLoggedIn().id;
      this.subordinateProfile = false;
    }
    this.usersService.getById(userId)
    .subscribe((user) => {
      this.userData = user as any;
      console.log(this.userData);
      this.form.setValue({
        firstName : this.userData.firstName, 
        lastName : this.userData.lastName,
        contact : this.userData.contact,
        isActive : (parseInt(this.userData.isActive) === 1)
      });
    });
  }

  async save() {
    let oldData = Object.assign({}, this.userData);
    let updatedData = Object.assign(oldData, this.form.value);
    updatedData.isActive = (updatedData.isActive === true) ? 1 : 0;  
    let response : any = await this.usersService.update(updatedData);
    if(response.code !== 200){
      let errorMessage = "Something went wrong";
      switch(response.code) {
        case 404 :
          errorMessage = "User does not exist";
          break;
      }
      this.snackbar.open(errorMessage, "Dismiss", { duration: 2000 });
    } else {
      if(!this.subordinateProfile) {
        let newUser = response.body;
        this.authService.updateUser(newUser);
      }
      this.snackbar.open("Successfully updated", "Dismiss", { duration: 2000 });

      //get logged in id and redirect
      let currentUser = this.authService.userLoggedIn();
      if(currentUser.id === updatedData.id) // Editing own's profile
        this.router.navigateByUrl('/dashboard');
      else // Editing someone else's profile
        this.router.navigateByUrl('/users');
    } 
  }


  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get contact() {
    return this.form.get('contact');
  }
  get isActive() {
    return this.form.get('isActive');
  }

}
