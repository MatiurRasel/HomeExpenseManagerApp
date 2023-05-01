import { Component, OnInit } from '@angular/core';
import { Month, Table } from '../models/models';
import { MonthToNumberPipe } from '../Pipes/month-to-number.pipe';
import { TableDataSourceService } from '../services/table-data-source.service';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {
  months: Month[] = [];
  monthsToDisplay: Month[] = [];
  
  constructor(public datasource: TableDataSourceService) {}
  
  ngOnInit(): void {
    this.datasource.getMonthList().subscribe((res)=>{
      for(let item of res) {
        this.addMonthByNumber(item.monthYear,item.monthNumber);
      }
      this.monthsToDisplay = this.months;
    });
  }

  addNextMonth() {
    let nextYear: string = '';
    let nextMonth: string = '';

    if(this.months[0].monthNumber ==='12') {
      nextMonth = '1';
      nextYear = (parseInt(this.months[0].monthYear) + 1).toString();
    } else {
      nextMonth = (parseInt(this.months[0].monthNumber) + 1).toString();
      nextYear = this.months[0].monthYear;

    }

    return this.addMonthByNumber(nextYear,nextMonth);

  }

  addMonthByName(monthYear:string,monthName:string) {
    let monthNumber = new MonthToNumberPipe().transform(monthName);
    return this.addMonthByNumber(monthYear,monthNumber);

  }


  addMonthByNumber(monthYear:string,monthNumber:string) {
    if(monthNumber!= '0') {
      let earningsTable: Table = {
        tableName:'earnings',
        columns:['date','name','amount'],
        rows:[],
        isSaved:false,
      };

      let expTable: Table = {
        tableName:'expenditure',
        columns:['date','name','amount'],
        rows:[],
        isSaved:false,
      };



      let month: Month = {
        monthNumber:monthNumber,
        monthYear:monthYear,
        tables:[earningsTable,expTable],
        calculation:[],
        isSaved:false,
      };
      this.months.unshift(month);
      return true;
    }
    return false;
  }

  deleteMonth(monthYear:string,monthName:string) {
    let monthNumber =  new MonthToNumberPipe().transform(monthName);
    let response = confirm('Are you sure ?');
    if(response) {
      this.months.forEach((month,index) => {
        if(
          month.monthNumber === monthNumber &&
          month.monthYear === monthYear
        ) {
          this.months.splice(index,1);
        }
      })
    }
  }



}
