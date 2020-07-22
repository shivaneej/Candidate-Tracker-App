import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http : HttpClient) { }

  getOverallStats(duration) {
    let url = 'http://localhost:8080/stats/global';
    return this.http.post<any>(url, duration);
  }

  getMyStats(duration) {
    let url = 'http://localhost:8080/stats/local';
    return this.http.post<any>(url, duration);
  }
}
