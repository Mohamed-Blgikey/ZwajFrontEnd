import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model : any = {};
  isLogin:boolean = false;
  user:any;
  constructor(private authServices:AuthService,private alert:AlertifyService) { }

  ngOnInit(): void {
    this.authServices.user.subscribe(()=>{
      this.user = this.authServices.user.getValue();
      // console.log(this.user);
    })

  }

  login(){
    this.authServices.login(this.model).subscribe((res:any)=>{
      if(res.message == 'تم تسجيل الدخول'){
        this.alert.success(res.message)
        localStorage.setItem('token',res.token);
        this.authServices.decodeUserToken();
      }
      else{
        this.alert.error(res.message)
      }
    })
  }

  loggedIn(){
    return this.authServices.loggedIn();
  }

  loggedOut(){
    localStorage.removeItem('token');
    this.alert.message("تم تسجيل الخروج")

  }

}
