import { Component, OnInit } from '@angular/core';
import { MonthNavigation } from '../models/models';
import { TableDataSourceService } from '../services/table-data-source.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  navigationList: MonthNavigation[];

  constructor(private datasource: TableDataSourceService) {
    this.navigationList = [];
  }

  ngOnInit(): void {
    this.datasource.monthNavigationObservable.subscribe((res) => {
      this.navigationList = res;
    });
  }

  newMonthNavigationClicked(event: any) {
      let monthNavigation: MonthNavigation = {
      monthYear: event.monthYear,
      monthNumber: event.monthNumber,
    };
    //alert (monthNavigation.monthNumber+"--"+ monthNavigation.monthYear);
    this.datasource.monthNavigationSelectedObservable.next(monthNavigation);
    
  }


}
