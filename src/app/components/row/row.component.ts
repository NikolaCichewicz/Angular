import {Component, Input, OnInit,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray,ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() rowForm: FormGroup;
  showInput = false;


  constructor(private formBuilder: FormBuilder,private parentControl: ControlContainer) {}


  ngOnInit() {
    setTimeout(()=>{
      this.rowForm.addControl("rows",this.formBuilder.array([this.createRow(true)]))

    })
  }


  createRow(disabled:boolean=false): FormGroup {
    return this.formBuilder.group({
      input1: [{value:'',disabled:disabled}, Validators.required],
      input2: [{value:'',disabled:disabled}, Validators.required],
      input3: [{value:'',disabled:disabled}, Validators.required],
      checkbox2: [{value:'',disabled:disabled}, Validators.requiredTrue],
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
