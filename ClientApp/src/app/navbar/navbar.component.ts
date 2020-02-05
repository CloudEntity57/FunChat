import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Input() user: IUser;
  @Input() users: IUser[];

  ngOnInit() {
  }

}
