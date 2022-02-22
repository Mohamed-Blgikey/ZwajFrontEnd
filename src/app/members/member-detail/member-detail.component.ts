import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { UserService } from 'src/app/_Services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  user:User|any;
  id:string ='';
  galleryOptions:NgxGalleryOptions[]|any;
  galleryImages:NgxGalleryImage[]|any;
  imgPrefix = environment.PhotoUrl;
  created:string='';
  option:any={
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric',
  };
  constructor(private _UserService:UserService,private alert:AlertifyService,private route:ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.data.subscribe(
      res=>{
        this.user = res['user'];
        // console.log(this.user);
      }
    )

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = this.getImages(this.user);
    // console.log(this.galleryImages);
    this.created = new Date(this.user.created).toLocaleString('ar-EG',this.option).replace('،','')

  }



  private getImages(user:User){
    const imageUrl = [];
    for (let i = 0; i < this.user?.photos?.length; i++) {
      imageUrl.push({
        small:this.imgPrefix+this.user.photos[i].url,
        medium :this.imgPrefix+ this.user.photos[i].url,
        big :this.imgPrefix+ this.user.photos[i].url
      })
    }
    return imageUrl;
  }


}
