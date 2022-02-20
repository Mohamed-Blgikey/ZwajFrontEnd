import { Component, OnInit ,Input, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Photo } from 'src/app/_models/photo';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit ,OnDestroy{

  @Input() photos:Photo[]|any;
  id :string = '';
  file:any;
  fileName:string = '';
  model:any = {} ;
  imgPrefix = environment.PhotoUrl;
  addPhoto:FormGroup  = new FormGroup({
    url: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    isMain: new FormControl(false),
    userId:new FormControl(this.id)
  })
;
  constructor(private _UserService:UserService,private auth:AuthService,private alert:AlertifyService) { }

  ngOnInit(): void {
    this.id = this.auth.user['_value'].nameid;
    // console.log(this.id);
  }

  uploadPhoto(event:any){
    this.stopAddunusablePhoto();
    this.file=event.target.files[0];
    // console.log(this.file);
    const formData:FormData=new FormData();
    formData.append('uploadedFile',this.file,this.file.name);
    this._UserService.addPhoto(formData).subscribe(res=>{
      this.fileName = res.message;
      //  console.log(res.message);
    })
  }


  Uplaod(Photo:FormGroup){
    Photo.controls['url'].setValue(this.fileName);
    Photo.controls['userId'].setValue(this.id)
    // console.log(Photo.value);
    this._UserService.UplaodPhoto(Photo.value).subscribe(res=>{
      this.alert.success("تم اضافه صوره جديده")
      this.fileName = '';
    },
    errr=>{
      this.alert.error("حدث خطا")
    })

  }

  private stopAddunusablePhoto(){
    if (this.fileName.length > 0) {
      let photo = {
        name : this.fileName
      };
      this._UserService.deletePhoto(photo).subscribe(res=>{
        // console.log(res);
      })
    }
  }

  ngOnDestroy(): void {

    this.stopAddunusablePhoto();
  }
}
