import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDetailsService} from '../../shared/user-details.service';
import {UserDetailsModel} from '../../shared/user-details.model';
import {ActivatedRoute, Router} from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  registerForm: FormGroup;
  disableForm = true;
  isEditable = false;
  isEditting = false;

  constructor(public service: UserDetailsService, private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [{value: '', disabled: this.disableForm}],
      email: [{value: '', disabled: this.disableForm}],
      password: [{value: '', disabled: this.disableForm}],
      confirmPassword: [{value: '', disabled: this.disableForm}],
    });
    if (this.router.url.includes('edit')) {
      this.isEditting = true;
      this.enableEdit();
      this.route.queryParams
        .pipe(filter(params => params.userDetailId)).subscribe(params => {
        this.service.getById(params.userDetailId).subscribe((res: UserDetailsModel) => {
          this.prepareEditForm(res);
        });
      });
    }
  }

  private prepareEditForm(res: UserDetailsModel) {
    this.registerForm = this.formBuilder.group({
      userDetailId: [res.userDetailId],
      username: [res.username, [Validators.required]],
      email: [res.email, [Validators.required]],
      password: [res.password, [Validators.required]],
    });
  }

  enableEdit() {
    this.disableForm = !this.disableForm;
    this.isEditable = true;
    this.enable(this.registerForm, true);
  }

  disableEdit() {
    this.disableForm = true;
    this.isEditable = false;
    this.enable(this.registerForm, false);
  }


  get f() {
    return this.registerForm.controls;
  }

  enable(form: FormGroup, enable: boolean) {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      console.log((control as any).length);
      if (control) {
        if ((control as any).controls)
        {
          console.log(key);
          this.enable(control as FormGroup, enable);
        }
        else {
          if (enable) { control.enable(); }
          else { control.disable(); }
        }
      }
    });
  }


  onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
   else if (this.router.url.includes('edit')) {
     this.service.update(this.registerForm.value).subscribe(res => {
       console.log();
     }, (err) => {
       console.log(err);
     });
   } else {
     this.service.create(this.registerForm.value).subscribe(res => {
       console.log();
       this.disableEdit();
       this.registerForm.reset();
     }, (err) => {
       console.log(err);
     });
   }
  }
}
