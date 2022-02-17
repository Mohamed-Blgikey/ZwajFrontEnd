import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  registerToggel(){
    this.registerMode = true;
  }

  cancelRegister(e:boolean){
    this.registerMode = e;
  }

}
