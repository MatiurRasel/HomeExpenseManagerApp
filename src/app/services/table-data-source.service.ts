import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataSourceService {
  baseUrl = "https://localhost:7183/api/Library/MonthsData/";
  constructor(private http: HttpClient) { }

  // Back End Requests
  getMonthList() {
    return this.http.get<any>(this.baseUrl+'GetListOfMonths');
  }
}
