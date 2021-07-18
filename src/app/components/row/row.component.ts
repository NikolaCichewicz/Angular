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
  readonly inputVisibleMapper: Record<number, boolean> = {};
  formArray: FormArray;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formArray = this.formBuilder.array([this.createRow(true)]);
    setTimeout(() => {
      this.rowForm.addControl('rows', this.formArray);
    });
  }

  createRow(disabled = false): FormGroup {
    return this.formBuilder.group({
      input1: [{ value: '', disabled }, Validators.required],
      input2: [{ value: '', disabled }, Validators.required],
      input3: [{ value: '', disabled }],
      checkbox2: [{ value: '', disabled }],
    });
  }

  toggleInput(index: number) {
    this.inputVisibleMapper[index] = !this.inputVisibleMapper[index];
    const formGroup = this.formArray.at(index) as FormGroup;
    const checkbox2 = formGroup.get('checkbox2');
    const input3 = formGroup.get('input3');

    if (checkbox2.value) {
      input3.setValidators(Validators.required);
    } else {
      // Note that I replaced `setValidators(null)` as there's a dedicated method for it: `clearValidators()`
      input3.clearValidators();
    }

    input3.updateValueAndValidity();
  }

  addNewRow() {
    this.formArray.push(this.createRow());
  }

  deleteRow(index: number) {
    this.formArray.removeAt(index);
  }
  
}