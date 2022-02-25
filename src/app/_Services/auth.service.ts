import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _lang: string = 'ar';
  dir: string = 'rtl';
  language = new BehaviorSubject<string>('ar');
  lang = this.language.asObservable();

  jwtHelper = new JwtHelperService();
  baseUrl: string = environment.baseUrl;
  user = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.decodeUserToken();
    this.lang.subscribe((lang) => {
      if (lang == 'en') {
        this.dir = 'ltr';
        this._lang = 'en';
      } else {
        this.dir = 'rtl';
        this._lang = 'ar';
      }
    });
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'Login', model);
  }

  decodeUserToken() {
    const token: any = localStorage.getItem('token');
    this.user.next(this.jwtHelper.decodeToken(token));
    // console.log(this.user);
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'Register', model);
  }

  loggedIn(): boolean {
    try {
      const token: any = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }
}
