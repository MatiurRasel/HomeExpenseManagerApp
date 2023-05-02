import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataSourceService {
  baseUrl = "https://localhost:7017/api/MonthsData/";
  constructor(private http: HttpClient) { }

  // Back End Requests
  getMonthList() {
    return this.http.get<any>(this.baseUrl + 'GetListOfMonths');
  }

  getTableRows(monthYear: string,monthNumber: string,tableName: string) {
    let parameters = new HttpParams();
    parameters = parameters.append('monthYear',monthYear);
    parameters = parameters.append('monthNumber',monthNumber);
    parameters = parameters.append('tableName',tableName);
    return this.http.get<any>(this.baseUrl + 'GetTableData',{
      params:parameters,
    });
  }

  postTableRow(monthDataForBackEnd: any) {
    return this.http.post(this.baseUrl + 'InsertTableRow',monthDataForBackEnd,
    {responseType: 'text'}
    );
  }

  deleteTableRow(rowId: number) {
    return this.http.delete(this.baseUrl + 'DeleteTableRow/' + rowId,
    {
      responseType:'text',
    });
  }
}
