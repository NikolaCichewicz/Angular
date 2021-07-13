import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() rowForm: FormGroup;
  showInput = false;
  @Input() disableForm = true;


  constructor(private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.rowForm = this.formBuilder.group({
      rows: this.formBuilder.array([this.createRow()])
    });
  }


  createRow(): FormGroup {
    return this.formBuilder.group({
      input1: [{value: '', disabled: this.disableForm}],
      input2: [{value: '', disabled: this.disableForm}],
      input3: [{value: '', disabled: this.disableForm}],
      checkbox2: [{value: '', disabled: this.disableForm}],
    });
  }

  toggleInput(index: number) {
    this.showInput = !this.showInput;
  }

  get formArray() {
    return this.rowForm.get('rows') as FormArray;
  }

  // Adding row function
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
