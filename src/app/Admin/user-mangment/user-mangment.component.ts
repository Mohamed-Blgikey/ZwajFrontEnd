import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-user-mangment',
  templateUrl: './user-mangment.component.html',
  styleUrls: ['./user-mangment.component.scss'],
})
export class UserMangmentComponent implements OnInit {
  userId: string = '';
  constructor(private userService: UserService, private auth: AuthService) {}

  ngOnInit(): void {}

  getUserReport() {
    this.userService
      .GetReportForUser(this.userId)
      .subscribe((response: any) => {
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
      });
  }
}
