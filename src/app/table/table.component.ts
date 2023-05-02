import { Component, Input, OnInit } from '@angular/core';
import { Table, TableRow } from '../models/models';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TableDataSourceService } from '../services/table-data-source.service';

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

  constructor(private dataSource: TableDataSourceService) {
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
    // Getting all the rows of this table when this table is LOCATION_INITIALIZED.
    this.dataSource.getTableRows(this.monthYear,this.monthNumber,this.table.tableName)
    .subscribe((res) => {
      for(let row of res) {
        this.addRowToArray(row.id,row.data,row.name,row.amount,true);
      }

    });



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

  addNewRow() {
    let date = this.dateControl.value;
    let name = this.dateControl.value;
    let amount = this.dateControl.value;

    let monthDataForBackEnd = {
      monthYear: this.monthYear,
      monthNumber: this.monthNumber,
      tableName: this.table.tableName,
      date:date,
      name:name,
      amount:amount,
    };
    this.dataSource.postTableRow(monthDataForBackEnd).subscribe((res) => {
      this.addRowToArray(parseInt(res),date,name,amount,true);
    });
  }

  addRowToArray ( 
    id: number,
    date: string,
    name: string,
    amount: string,
    isSaved: boolean
    ) {
      let row: TableRow = {
        id:id,
        date:date,
        name:name,
        amount:amount, 
        isSaved:isSaved,
      };
      this.table.rows.push(row);
      this.clearForm();

  }
   
  deleteRow(id: number | undefined) {
    this.table.rows.forEach((row, index) => {
      if(id && row.id === id) {
        this.dataSource.deleteTableRow(row.id).subscribe((res) => {
          this.table.rows.splice(index,1);
        });
      }

    });

  }

  clearForm() {
    this.dateControl.setValue('');
    this.nameControl.setValue('');
    this.amountControl.setValue('');
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