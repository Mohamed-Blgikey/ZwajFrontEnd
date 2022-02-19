import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { User } from "../_models/user";
import { AlertifyService } from "../_Services/alertify.service";
import { UserService } from "../_Services/user.service";

@Injectable()

export class MemberDetailResolver implements Resolve<User>{

  constructor(private _UserService:UserService,private router:Router,private alert:AlertifyService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
      return this._UserService.getUser(route.params['id']).pipe(
        catchError((error)=>{
          this.alert.error("يوجد مشكله فى عرض البيانات");
          this.router.navigate(['/member']);
          return of();
        })
      )
  }

}
