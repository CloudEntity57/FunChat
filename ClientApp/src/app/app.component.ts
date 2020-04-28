import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IConversation, ConversationService } from './shared';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { UserService } from './shared/user.service';
import { HubService } from './shared/hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  env = environment;
  title = 'app';
  users: any;
  user: IUser;
  userImg: string;
  // Josh
  userID = 'ae744423-71b7-4c43-ba1a-23c96fc2c6cd';

  // Bleepy
  // userID = '189f3bc0-fc77-4268-bb32-e562bbf94140';

  pms: any;
  generalChats: any;
  userProfile: any;

  constructor(public auth: AuthService, private userService: UserService) {

  }
  joinConversation(chat: IConversation) {

  }


  logIn(){
    this.auth.login();  // the method contains `loginWithRedirect()`
  }
  logOut(){
    this.auth.logout();
  }

}
