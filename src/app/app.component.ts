import { Component } from '@angular/core';
import { AuthService } from './_Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   *
   */
  constructor(public auth: AuthService) {}
  title = 'Zwaj';
}
