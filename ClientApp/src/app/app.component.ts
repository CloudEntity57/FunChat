import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IConversation, ConversationService } from './shared';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  env = environment;
  title = 'app';
  users: any;
  user: IUser;
  // user: IUser = {
  //   firstName: 'Josh',
  //   lastName: 'Foster',
  //   email: 'josh@allenb.com',
  //   id: 'ae744423-71b7-4c43-ba1a-23c96fc2c6cd',
  //   userConversation: []
  // };
  // Josh
  userID = 'ae744423-71b7-4c43-ba1a-23c96fc2c6cd';

  // Bleepy
  // userID = '189f3bc0-fc77-4268-bb32-e562bbf94140';

  pms: any;
  generalChats: any;
  userProfile: any;

  constructor(public auth: AuthService, private convService: ConversationService, private http: HttpClient,
     @Inject('BASE_URL') baseUrl: string) {

    // this.convService.getPMs().subscribe(resp => {
    //   console.log('pms', resp);
    //   this.pms = resp;
    // });
    // this.convService.getGeneralConversations().subscribe(resp => {
    //   console.log('pms', resp);
    //   this.generalChats = resp;
    // });
  }
  joinConversation(chat: IConversation) {

  }

  logIn(){
    this.auth.login();
  }
  logOut(){
    this.auth.logout();
  }
  ngOnInit(){
    // this.auth.getUser$().subscribe(user => {
    //   console.log('user: ',user)
    // });
    // this.auth.userProfile$.subscribe(profile => {

    //   console.log('your profile: ',profile)
    //   console.log('logged in: ',this.auth.loggedIn)
    // });
  }
}
