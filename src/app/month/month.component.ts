import { Component, Input, OnInit } from '@angular/core';
import { Month } from '../models/models';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  @Input() month: Month;

  constructor() {
    this.month = {
      monthYear: '',
      monthNumber:'',
      tables:[],
      calculation:[],
      isSaved:false,
    }
  }
  ngOnInit(): void {
    
  }

}
