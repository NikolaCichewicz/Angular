import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  //Pattern to check if email is correct
  
  registerForm;


  constructor(private formBuilder: FormBuilder) {}

  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      confirmpassword: [''],
      dropdown:['']
    });
  } 

  items = [
    {
      id: 1,
      name: 'Option 1'
    }, 
    {
      id: 2,
      name: 'Option 2'
    }, {
      id: 3,
      name: 'Option 3'
    }, {
      id: 4,
      name: 'Option 4'
    },
  ]

 

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmpassword() {
    return this.registerForm.get('confirmpassword');
  }
  get dropdown() {
    return this.registerForm.get('dropdown');
  }


  onSubmit() {
    console.log(this.registerForm.value)
  }
}
