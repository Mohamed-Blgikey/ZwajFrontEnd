import { Component, OnInit ,Input} from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos:Photo[]|any;
  file:any;
  fileName:string = '';
  constructor(private _UserService:UserService) { }

  ngOnInit(): void {
  }

  uploadPhoto(event:any){
    this.stopAddunusablePhoto();
    this.file=event.target.files[0];
    // console.log(this.file);
    const formData:FormData=new FormData();
    formData.append('uploadedFile',this.file,this.file.name);
    this._UserService.addPhoto(formData).subscribe(res=>{
       this.fileName = res.message;
       console.log(res.message);

    })
  }

  private stopAddunusablePhoto(){
    if (this.fileName.length > 0) {
      let photo = {
        name : this.fileName
      };
      this._UserService.deletePhoto(photo).subscribe(res=>{
        console.log(res);
      })
    }
  }

}
