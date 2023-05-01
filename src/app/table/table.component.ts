import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../models/models';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  @Input() table: Table; 
  @Input() monthNumber: string;
  @Input() monthYear: string;

  addRowForm: FormGroup;

  constructor() {
    this.table = {
      tableName:'',
      columns:[],
      rows:[],
      isSaved:false,
    
    };
    this.addRowForm =  new FormGroup({});
    this.monthNumber = '';
    this.monthYear  = '';
  }


  ngOnInit(): void {
    this.addRowForm =  new FormGroup({
      date: new FormControl('',[Validators.required,
        Validators.pattern('[0-9]*'),
        daysInMonthValidator(this.monthYear, this.monthNumber),
      ]),
      name: new FormControl('',[Validators.required]),
      amount: new FormControl('',[Validators.required,
        Validators.pattern('[0-9]*'),]),
    });
  }

  // GETTER TO ACCESS FORM ELEMENTS AND FORM ITSELF
  public get dateControl(): FormControl {
    return this.addRowForm.controls['date'] as FormControl;

  }

  public get nameControl(): FormControl {
    return this.addRowForm.controls['name'] as FormControl;

  }
  
  public get amountControl(): FormControl {
    return this.addRowForm.controls['amount'] as FormControl;

  }
  
  public get RowForm() {
    return this.addRowForm as FormGroup;
  }


}


function daysInMonthValidator(
  monthYear: string , 
  monthNumber: string
  ):ValidatorFn {
  return(control: AbstractControl):{ [key: string]: boolean} | null => {
    if(parseInt(control.value) < 1 || 
    parseInt(control.value) > getDaysInMonth(monthYear,monthNumber)
    ) {
      return {daysInvalid:true};

    }
    return null;
  };
}

function getDaysInMonth(monthYear: string,monthNumber: string) : number {
  return new Date(parseInt(monthYear),parseInt(monthNumber),0).getDate();

}