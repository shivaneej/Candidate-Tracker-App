import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append("Authorization", "Basic " + btoa("admin:admin"));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(this.url, httpOptions);
  }
}




  

  