import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  baseUrl :string = 'https://localhost:44395/';
  user = new BehaviorSubject(null);
  constructor(private http:HttpClient) {
    this.decodeUserToken();
  }

  login(model:any){
    return this.http.post(this.baseUrl+"Login",model);
  }

  decodeUserToken(){
    const token:any = localStorage.getItem('token');
    this.user.next(this.jwtHelper.decodeToken(token));
    // console.log(this.user);
  }
  register(model:any){
    return this.http.post(this.baseUrl+'Register',model);
  }

  loggedIn():boolean{
    try{
      const token:any = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }
    catch{
      return false;
    }
  }
}
