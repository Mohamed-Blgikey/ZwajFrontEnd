import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl :string = 'https://localhost:44395/';

  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl+"Login",model);
  }

  register(model:any){
    return this.http.post(this.baseUrl+'Register',model);
  }
}
