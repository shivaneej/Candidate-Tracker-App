import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService extends DataService{

  constructor(http : HttpClient) {
      let url = "http://localhost:8080/candidates/";
      super(url,http);
   }

  async saveOrUpdateCandidate(candidate : any , cv : File, flag) { // Flag - True : Save
    let response : any; 
    if(flag) response = await this.save(candidate);
    else response = await this.update(candidate);
    console.log(response);
    if(response.code === 200){
      return new Promise((resolve, reject) => {
        if(!cv)
          resolve({code : 200});
        else {
          let cv_url = "http://localhost:8080/candidates/" + response.body.id + "/cv";
          const cvData = new FormData();
          cvData.append("cvFile" , cv);
          this.http.post<any>(cv_url, cvData).toPromise().then((response) => {
            resolve({code : 200});
          }).catch((error) => {
            resolve({ code : error.status, error : error.error});
          });
        }
      });
    }else{
      return response;
    }
  }
}
