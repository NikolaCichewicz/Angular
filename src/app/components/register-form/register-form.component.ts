import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  registerForm;
  disableForm = true;
  isEditable:boolean = false;
  itemsToShow = [];
  itemIdToHide = 4;


  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: [{value: '', disabled: this.disableForm}],
      email: [{value: '', disabled: this.disableForm}],
      password: [{value: '', disabled: this.disableForm}],
      confirmpassword: [{value: '', disabled: this.disableForm}],
      dropdown: [{value: '', disabled: this.disableForm}],
      checkbox1: [{value: '', disabled: this.disableForm}],
      rowForm: this.formBuilder.group({})
    });
  }


  ngOnInit(): void {
    this.itemsToShow = this.getFilteredItems([this.itemIdToHide]);

    this.checkbox1.valueChanges.subscribe((checked) => {
      if (checked) {
        this.itemsToShow = [...this.items];
      } else {
        this.itemsToShow = this.getFilteredItems([this.itemIdToHide]);
      }
    });
  }

  private getFilteredItems(idsToHide: number[]): { id: number; name: string }[] {
    return this.items.filter((item) => !idsToHide.includes(item.id));
  }

  get rowForm(){
    return this.registerForm.get('rowForm') as FormGroup
  }

  enableEdit() {
    this.disableForm = !this.disableForm;
    this.isEditable = true;
    this.enable(this.registerForm,true)
  }

  items = [
    {
      id: 1,
      name: 'Option 1'
    },
    {
      id: 2,
      name: 'Option 2'
    },
    {
      id: 3,
      name: 'Option 3'
    },
    { //extra option
      id: 4,
      name: 'Option 4'
    },
  ];


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

  get checkbox1() {
    return this.registerForm.get('checkbox1');
  }

  enable(form: FormGroup, enable: boolean) {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      console.log((control as any).length)
      if (control) {
        if ((control as any).controls)
        {
          console.log(key)
          this.enable(control as FormGroup, enable);
        }
        else {
          if (enable) control.enable();
          else control.disable();
        }
      }
    });
  }


  onSubmit() {
    console.log(this.registerForm.value);
    this.registerForm.disable();
    this.isEditable = false;
  }
}
