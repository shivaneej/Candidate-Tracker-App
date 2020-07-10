import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {

  candidateId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get("id");
  }

}
