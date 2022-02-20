import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  registerForm:FormGroup|any;

  constructor(private auth:AuthService, private alert:AlertifyService ,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender:['رجل'],
      email: ['', [Validators.required,Validators.email]],
      name : ['',Validators.required],
      dateOfBirth:[null,Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      interests:['',Validators.required],
      introduction:['',Validators.required],
      lookingFor:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
     })
  }




  register(){
    // console.log('تم الاشتراك');
    // console.log(this.model);
    console.log(this.registerForm.value);
    this.auth.register(this.registerForm.value).subscribe((res:any)=>{
      if(res.message == 'تم تسجيل مستخدم جديد'){
        // console.log(res.message);
        this.alert.success(res.message)

      }else{
        // console.log(res.message);
        this.alert.error(res.message)
      }
    })

    ;
  }

  cancel(){
    this.alert.warning("ليس الان")
    // console.log("ليس الان");
    this.cancelRegister.emit(false);
  }

}
