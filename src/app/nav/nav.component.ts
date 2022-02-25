import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  isLogin: boolean = false;
  user: any;
  constructor(
    public authServices: AuthService,
    private alert: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authServices.user.subscribe(() => {
      this.user = this.authServices.user.getValue();
      // console.log(this.authServices.user['_value']);
    });
  }

  login() {
    this.authServices.login(this.model).subscribe((res: any) => {
      if (res.message == 'تم تسجيل الدخول') {
        this.alert.success(res.message);
        localStorage.setItem('token', res.token);
        this.authServices.decodeUserToken();
        this.model = {};
        this.router.navigate(['/members']);
      } else {
        this.alert.error(res.message);
      }
    });
  }

  loggedIn() {
    return this.authServices.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.alert.message('تم تسجيل الخروج');
    this.router.navigate(['/']);
  }

  ar() {
    this.authServices.language.next('ar');
  }
  en() {
    this.authServices.language.next('en');
  }
}
