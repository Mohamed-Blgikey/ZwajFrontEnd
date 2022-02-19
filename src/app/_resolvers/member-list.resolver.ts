import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AlertifyService } from '../_Services/alertify.service';
import { UserService } from '../_Services/user.service';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  /**
   *
   */
  constructor(private _UserService:UserService,private router:Router,private alert:AlertifyService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    return this._UserService.getUsers().pipe(
      catchError((error)=>{
        this.alert.error("يوجد مشكله فى عرض البيانات");
        this.router.navigate(['/']);
        return of();
      })
    )
  }
}
