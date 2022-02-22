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

  editUser(user:any):Observable<any>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.put<any>(this.baseUrl+'EditUser',user,{headers:header});
  }

  addPhoto(photo:any):Observable<any>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.post<any>(this.baseUrl+'SavePhoto',photo,{headers:header});
  }
  deletePhoto(photo:any):Observable<any>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.post<any>(this.baseUrl+'UnSavePhoto',photo,{headers:header});
  }

  UplaodPhoto(photo:any):Observable<any>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.post<any>(this.baseUrl+'AddPhoto',photo,{headers:header});
  }

  DeletePhoto(photo:any):Observable<any>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.post<any>(this.baseUrl+'DeletePhoto',photo,{headers:header});
  }

  SetMainPhoto(photo:any):Observable<any>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.post<any>(this.baseUrl+'SetMain',photo,{headers:header});
  }

  Like(likerId:string,likeeId:string):Observable<any>{
    let token:any = localStorage.getItem('token');
    let header = new HttpHeaders()
      .set("Authorization","Bearer " + token)

    return this.http.post<any>(this.baseUrl+likerId+'/like/'+likeeId,{},{headers:header});
  }
}

