import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import { IUser } from '../shared';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService, private userService: UserService) { }
  originalUser: any;
  user: IUser;

  ngOnInit() {
    console.log('profile init user: ',this.userService.userProfile);
  }

}
