import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  imgPrefix = environment.PhotoUrl;
  messages:Message[] |any = [];
  paginatoin:Pagination |any;
  messageType = 'Outbox';
  constructor(private userService:UserService,private auth:AuthService,private active:ActivatedRoute,private alert:AlertifyService) { }

  ngOnInit(): void {
    this.active.data.subscribe(res=>{
      this.messages = res['messages'].result;
      this.paginatoin = res['messages'].pagination;
    })
  }


  loadMessages(type:string){
    this.messageType = type;
    this.userService.GetMessages(this.auth.user['_value'].nameid,this.paginatoin.currentPage,this.paginatoin.itemsPerPage,type).subscribe((res:PaginationResult<Message[]>)=>{
      this.messages = res.result;
      this.paginatoin = res.pagination;
      console.log(res);

    },
    err=>{
      this.alert.error(err);
    })
  }

  pageChanged(event:any):void{
    this.paginatoin.currentPage = event.page;
    this.loadMessages(this.messageType);
  }

}
