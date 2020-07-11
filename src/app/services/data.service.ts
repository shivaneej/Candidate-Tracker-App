import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

export class DataService {

  constructor(private url: string, protected http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  save(resource) {
    console.log("Save called for object " + JSON.stringify(resource));
  }
}


  

  