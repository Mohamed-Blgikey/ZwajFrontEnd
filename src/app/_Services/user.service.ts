import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../_models/pagination';
import { User } from '../_models/user';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<User[]>(this.baseUrl + 'GetUsers', {
      headers: header,
    });
  }
  getUser(id: string): Observable<User> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<User>(this.baseUrl + 'GetUser/' + id, {
      headers: header,
    });
  }

  editUser(user: any): Observable<any> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.put<any>(this.baseUrl + 'EditUser', user, {
      headers: header,
    });
  }

  addPhoto(photo: any): Observable<any> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(this.baseUrl + 'SavePhoto', photo, {
      headers: header,
    });
  }
  deletePhoto(photo: any): Observable<any> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(this.baseUrl + 'UnSavePhoto', photo, {
      headers: header,
    });
  }

  UplaodPhoto(photo: any): Observable<any> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(this.baseUrl + 'AddPhoto', photo, {
      headers: header,
    });
  }

  DeletePhoto(photo: any): Observable<any> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(this.baseUrl + 'DeletePhoto', photo, {
      headers: header,
    });
  }

  SetMainPhoto(photo: any): Observable<any> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(this.baseUrl + 'SetMain', photo, {
      headers: header,
    });
  }

  Like(likerId: string, likeeId: string): Observable<any> {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(
      this.baseUrl + likerId + '/like/' + likeeId,
      {},
      { headers: header }
    );
  }

  GetMessages(id: string, page?: any, itemPerPage?: any, messageType?: any) {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const paginationResult: PaginationResult<Message[]> = new PaginationResult<
      Message[]
    >();
    let params = new HttpParams().set('messageType', messageType);
    if (page != null && itemPerPage != null) {
      params.append('pageNumber', page);
      params.append('pageSize', itemPerPage);
    }

    return this.http
      .get<Message[]>(this.baseUrl + 'api/users/' + id + '/Messages', {
        observe: 'response',
        params: params,
        headers: header,
      })
      .pipe(
        map((res) => {
          paginationResult.result = res.body;
          if (res.headers.get('pagination') !== null) {
            let pagination: any = res.headers.get('pagination');
            paginationResult.pagination = JSON.parse(pagination);
          }
          return paginationResult;
        })
      );
  }

  GetConversation(id: string, recipientId: string) {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<Message[]>(
      `${this.baseUrl}api/users/${id}/Messages/chat/${recipientId}`,
      { headers: header }
    );
  }

  SendMessage(id: string, message: Message) {
    let token: any = localStorage.getItem('token');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post(
      // /api/users/dsfsdffd/Messages
      `${this.baseUrl}api/users/${id}/Messages`,
      message,
      { headers: header }
    );
  }

  GetReportForUser(id: string): any {
    return this.http
      .get(this.baseUrl + 'api/Users/UserReport/' + id, {
        headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
        responseType: 'blob',
      })
      .pipe(
        tap(
          () => console.log('تم إستلام الملف بنجاح'),
          (error) => console.log(error)
        )
      );
  }
}
