import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  imgPrefix = environment.PhotoUrl;
  @Input() user:User|any;
  constructor() { }

  ngOnInit(): void {
  }

}
