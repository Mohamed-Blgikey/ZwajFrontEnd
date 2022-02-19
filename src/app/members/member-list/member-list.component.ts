import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_Services/alertify.service';
import { UserService } from '../../_Services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users:User[]|undefined;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(res=>{
      this.users = res['users'];
    })
  }



}
