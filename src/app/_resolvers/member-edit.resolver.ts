import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { User } from "../_models/user";
import { AlertifyService } from "../_Services/alertify.service";
import { AuthService } from "../_Services/auth.service";
import { UserService } from "../_Services/user.service";

@Injectable()

export class MemberEditResolver implements Resolve<User>{

  constructor(private _UserService:UserService,private router:Router,private alert:AlertifyService,private auth:AuthService) {}

  id = this.auth.user['_value'].nameid;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
      return this._UserService.getUser(this.id).pipe(
        catchError((error)=>{
          this.alert.error("يوجد مشكله فى عرض البيانات");
          this.router.navigate(['/member']);
          return of();
        })
      )
  }

}
