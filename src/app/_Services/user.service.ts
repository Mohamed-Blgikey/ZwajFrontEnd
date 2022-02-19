import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl :string = environment.baseUrl;
  constructor(private http:HttpClient) { }


  getUsers():Observable<User[]>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.get<User[]>(this.baseUrl+'GetUsers',{headers:header});
  }
  getUser(id:string):Observable<User>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.get<User>(this.baseUrl+'GetUser/'+id,{headers:header});
  }
}
