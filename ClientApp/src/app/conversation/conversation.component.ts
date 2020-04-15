import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../shared/conversation.service';
import { UserService } from '../shared/user.service';
import { AuthService } from '../auth.service';
import { concatMap, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private auth: AuthService, private userService: UserService, private convService: ConversationService) { }
  pms: any;
  generalChats: any = [];
  user: any = { id: ''};
  users: any = [];

  joinConversation(){

  }

  ngOnInit(): void {
    this.convService.getPMs().subscribe(resp => {
      console.log('pms', resp);
      this.pms = resp;
    });
    this.convService.getGeneralConversations().subscribe(resp => {
      console.log('pms', resp);
      this.generalChats = resp;
    });

    this.auth.getUser$().pipe(
      mergeMap(user => this.userService.getUsers().pipe(map(res => [user,res])))
    ).subscribe(comps => {
      const profile = comps[0];
      const userArr = comps[1];
      this.userService.saveUsers(userArr);
      let match: boolean = false;
      userArr.forEach(usrDB => {
        if(usrDB.userID === profile.sub){
          this.userService.userChange(usrDB);
          match = true;
        }
      });
      if(!match){
        console.log('need to make user')
        this.userService.createUser(profile).subscribe(res => {
          this.user = res;
          this.users = userArr.push(res);
        })
      }
    })
  }

}
