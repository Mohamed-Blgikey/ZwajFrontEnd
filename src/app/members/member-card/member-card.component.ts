import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  imgPrefix = environment.PhotoUrl;
  @Input() user:User|any;
  constructor(private auth:AuthService,private _UserService:UserService,private alert:AlertifyService) { }

  ngOnInit(): void {
  }
  sendLike(id:string){
    this._UserService.Like(this.auth.user['_value'].nameid,id).subscribe(res=>{
      this.alert.success(res.message)
    },
    err=>{
      this.alert.error(err.message)
    })
  }

}
