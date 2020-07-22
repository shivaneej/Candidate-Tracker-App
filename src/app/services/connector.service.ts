import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  errorEvent: Subject<boolean> = new Subject<boolean>();
  
  constructor() { }

  sessionExpired(event) {
    this.errorEvent.next(true);
  }
}
