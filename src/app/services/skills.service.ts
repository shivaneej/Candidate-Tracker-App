import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() { }

  getAll() {
    return ['Spring', 'Angular', 'Java', 'Python', 'Javascript', 'Perl'];
  }
}
