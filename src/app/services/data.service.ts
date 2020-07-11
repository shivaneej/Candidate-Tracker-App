import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

export class DataService {

  constructor(private url: string, protected http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  getById(id) {
    return this.http.get(this.url + id);
  }

  save(resource) {
    console.log("Save called for object " + JSON.stringify(resource));
    return new Promise((resolve, reject) => {
      // POST request to server
      this.http.post<any>(this.url, resource).toPromise().then((response) => {
        resolve({ code : 200});
      }).catch((error) => {
        resolve({ code : error.status, error : error.error});
      });
    });
  }

  update(resource) {
    console.log("Update called for object " + JSON.stringify(resource));
    return new Promise((resolve, reject) => {
      // PUT request to server
      this.http.put<any>(this.url, resource).toPromise().then((response) => {
        resolve({ code : 200 , body : response });
      }).catch((error) => {
        resolve({ code : error.status, error : error.error});
      });
    });
  }
}


  

  