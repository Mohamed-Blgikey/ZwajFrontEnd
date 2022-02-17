import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model:any={};
  @Output() cancelRegister:EventEmitter<boolean> = new EventEmitter();
  constructor(private auth:AuthService,private alert:AlertifyService) { }

  ngOnInit(): void {
  }

  register(){
    // console.log('تم الاشتراك');
    // console.log(this.model);
    this.auth.register(this.model).subscribe((res:any)=>{
      if(res.message == 'تم تسجيل مستخدم جديد'){
        // console.log(res.message);
        this.alert.success(res.message)

      }else{
        // console.log(res.message);
        this.alert.error(res.message)
      }
    })
  }

  cancel(){
    this.alert.warning("ليس الان")
    // console.log("ليس الان");
    this.cancelRegister.emit(false);
  }

}
