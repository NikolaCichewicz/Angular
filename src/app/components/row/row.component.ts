import {Component, Input, OnInit,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray,ControlContainer, ValidatorFn, AbstractControl} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() rowForm: FormGroup;
  subscription: Subscription;
  showInput = false;


  constructor(private formBuilder: FormBuilder,private parentControl: ControlContainer) {}


  ngOnInit() {
    setTimeout(()=>{
      this.rowForm.addControl("rows",this.formBuilder.array([this.createRow(true)]))

    });
    const checkbox2 = <FormControl>this.rowForm.get('checkbox2');
    const input3 = <FormControl>this.rowForm.get('input3');

    this.subscription = checkbox2.valueChanges.subscribe(value => {
      if (value) {
        input3.setValidators([Validators.required, ])
      }
      else {
        input3.setValidators(null);
      }

      input3.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createRow(disabled:boolean=false): FormGroup {
    return this.formBuilder.group({
      input1: [{value:'',disabled:disabled}, Validators.required],
      input2: [{value:'',disabled:disabled}, Validators.required],
      input3: [{value:'',disabled:disabled}],
      checkbox2: [{value:'',disabled:disabled}],
    });
  }

  toggleInput(index: number) {
    this.showInput = !this.showInput;
  }

  get formArray() {
    return this.rowForm.get('rows') as FormArray;
  }

  addNewRow() {
    this.formArray.push(this.createRow());
  }

  deleteRow(index: number) {
    this.formArray.removeAt(index);
  }

  getControls() {
    return (this.rowForm.get('rows') as FormArray).controls;
  }
}
