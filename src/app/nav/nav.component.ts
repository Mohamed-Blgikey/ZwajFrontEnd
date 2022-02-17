import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model : any = {};
  isLogin:boolean = false;
  constructor(private authServices:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authServices.login(this.model).subscribe((res:any)=>{
      if(res.message == 'تم تسجيل الدخول'){
        console.log(res.message);
        localStorage.setItem('token',res.token);
      }
    })
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !! token;
  }

  loggedOut(){
    localStorage.removeItem('token');
    console.log("تم تسجيل الخروج");

  }

}
