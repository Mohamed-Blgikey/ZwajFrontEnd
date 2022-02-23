import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';
import { UserService } from '../_Services/user.service';

@Injectable({ providedIn: 'root' })
export class MessageResolver implements Resolve<Message> {
  pageNumber = 1;
  pageSize = 6;
  messageType = "Unread";
  /**
   *
   */
  constructor(private auth:AuthService,private userService:UserService,private router:Router,private alert:AlertifyService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> | Promise<Message[]> | Message[]|any
  {
    return this.userService.GetMessages(this.auth.user['_value'].nameid,this.pageNumber,this.pageSize,this.messageType).pipe(
      catchError(err=>{
        this.alert.error("error");
        this.router.navigate(['/']);
        return of()
      })
    )
  }
}
