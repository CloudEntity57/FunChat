import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IConversation, ConversationService } from './shared';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  constructor(private convService: ConversationService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    // currently grabbing user from environment until OAuth implemented
    this.env.user = this.user;
    this.http.get(baseUrl + '/User').subscribe(resp => {
      console.log('users - ', resp);
      this.users = resp;
      this.convService.saveUsers(this.users);
    });
    this.http.get(`${baseUrl}/User/${this.userID}`).subscribe(resp => {
      console.log('USER - ', resp);
      this.user = resp[0];
      // this.env.user = resp[0];
      this.convService.userChange(resp[0]);
      this.env.userId = resp[0].id;
    });
    this.http.get(`${baseUrl}/Conversation/PM`).subscribe(resp => {
      console.log('pms', resp);
      this.pms = resp;
    });
    this.http.get(`${baseUrl}/Conversation/General`).subscribe(resp => {
      console.log('pms', resp);
      this.generalChats = resp;
    });
  }
  joinConversation(chat: IConversation) {

  }
}
