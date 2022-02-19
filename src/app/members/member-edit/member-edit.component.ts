import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm : NgForm|any;
  user:User|any;
  id:string ='';
  constructor(private route:ActivatedRoute,private alert:AlertifyService,private _UserService:UserService,private auth:AuthService) {
    this.id = this.auth.user['_value'].nameid;
  }

  ngOnInit(): void {
    this.route.data.subscribe(res=>{
      this.user = res['user'];
      // console.log(this.user);

    })
  }

  updateUser(){
    // console.log(this.user);
    let user = {
        id:this.user?.id,
        introduction: this.user?.introduction,
        lookinFor: this.user?.lookingFor,
        interests: this.user?.interests,
        city: this.user?.city,
        country: this.user?.country

    }

    // console.log(user);


    this._UserService.editUser(user).subscribe(
      res=>{
        this.editForm.reset(this.user)
        this.alert.success("تم التعديل")
      }
,
      err=>{
        this.alert.error(err)
      }
    )
  }

}
