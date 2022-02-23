import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-memmber-message',
  templateUrl: './memmber-message.component.html',
  styleUrls: ['./memmber-message.component.scss'],
})
export class MemmberMessageComponent implements OnInit {
  @Input() recipientId: string = '';
  messages: Message[] = [];
  newMessage: any = {};
  imgPrefix = environment.PhotoUrl;
  hubConnection: any;
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseUrl + '/chat')
      .build();
    this.hubConnection.start();
    this.hubConnection.on('refresh', () => {
      setTimeout(() => {
        this.loadMessages();
      }, 500);
    });
  }

  loadMessages() {
    this.userService
      .GetConversation(this.auth.user['_value'].nameid, this.recipientId)
      .subscribe(
        (res) => {
          this.messages = res;
          this.messages = this.messages.reverse();
          console.log(res);
        },
        (err) => {
          console.log(err);

          this.alert.error(err);
        }
      );
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.newMessage.senderId = this.auth.user['_value'].nameid;
    this.userService
      .SendMessage(this.auth.user['_value'].nameid, this.newMessage)
      .subscribe((res: any) => {
        this.newMessage.content = '';
        this.hubConnection.invoke('refresh');
      });
  }
}
