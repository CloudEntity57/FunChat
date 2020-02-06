import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  users: any;
  user: IUser;
  userID = 'ae744423-71b7-4c43-ba1a-23c96fc2c6cd';
  pms: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl : string){
    http.get(baseUrl + '/User').subscribe(resp => {
      console.log('users - ',resp);
      this.users = resp;
    });
    http.get(`${baseUrl}/User/${this.userID}`).subscribe(resp => {
      console.log('USER - ',resp);
      this.user = resp[0];
    });
    http.get(`${baseUrl}/Conversation/PM`).subscribe(resp =>{
      console.log('pms', resp);
      this.pms = resp;
    });
  }
}
