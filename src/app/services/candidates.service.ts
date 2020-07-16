import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
// import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService extends DataService{

  constructor(http : HttpClient) {
      let url = "http://localhost:8080/candidates/";
      super(url,http);
   }

  async saveCandidate(candidate : any , cv : File) {
    let response : any = await this.save(candidate);
    console.log(response.code);
    if(response.code === 200){
      return new Promise((resolve, reject) => {
        let cv_url = "http://localhost:8080/candidates/" + response.response_json.id + "/cv";
        const cvData = new FormData();
        cvData.append("cvFile" , cv);
        this.http.post<any>(cv_url, cvData).toPromise().then((response) => {
          resolve({code : 200});
        }).catch((error) => {
          resolve({ code : error.status, error : error.error});
        });
      });
    }else{
      return response;
    }
  }
}
