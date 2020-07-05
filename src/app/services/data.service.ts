import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
    .pipe(
        map((response) => response), 
        retry(3)
    )
  }
}




  

  