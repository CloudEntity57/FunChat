import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser, IConversation, IUserConversation, ConversationService } from '../shared';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  constructor(private router: Router, private convService: ConversationService, public auth: AuthService) {
    this.convService.convID.subscribe(id => {
      console.log('VIEWING - ',id)
      this.viewing = id;
    });
  }

  @Input() user: IUser;
  @Input() users: IUser[];
  @Input() pms: IConversation[];
  @Input() generalChats: IConversation[];
  @Output() joinConversation = new EventEmitter<IConversation>();
  newConversation: NgModel;
  addingConversation = false;
  viewing: string;

  switchPMChat(other_user: IUser): void {
    let privateConversationID: string;
    this.convService.convIDChange(other_user.firstName);

    this.user.userConversation.forEach(pmConversation => {
      other_user.userConversation.forEach(their_userConversation => {
        if (their_userConversation.convID === pmConversation.convID && this.pms.find(pm => pm.id === pmConversation.convID)) {
          privateConversationID = their_userConversation.convID;
        }
      });
    });

    console.log('privateConversationID ', privateConversationID)
    if (!privateConversationID){
      // create new PM conversation
      this.convService.createConversation('PM').subscribe(conv =>{
        // create userconversation for both users
        this.createUserConversation(other_user.id, conv.id).subscribe(res1 =>{
          this.createUserConversation(this.user.id, conv.id).subscribe(res =>{
            this.router.navigate(['chat'], { queryParams: { id: res.convID}});
          });
        });
      });
    }
    this.router.navigate(['chat'], { queryParams: { id: privateConversationID }});
  }
  switchGeneralChat(conv: IConversation){
    const isJoined = this.isChatJoined(conv);
    // this.viewing = conv.id;
    // this.convService.convIDChange(conv.id);
    console.log('is joined: ',isJoined)
    if ( !isJoined ) {
      this.createUserConversation(this.user.id, conv.id).subscribe(res => {
        console.log('created another one')
        this.router.navigate(['chat'], { queryParams: { id: conv.id}});
      });
    }
    this.convService.convIDChange(conv.id);

    this.router.navigate(['chat'], { queryParams: { id: conv.id}});
  }


  createUserConversation(userID: any, convID: any): Observable<IUserConversation> {
    return this.convService.createUserConversation(userID, convID).pipe(
      map(res => res)
    );
  }

  createClicked():void{
    this.addingConversation = true;
  }
  returnListener(event){
    if(event.keyCode == 13){
      this.addGeneralConversation();
    }
  }

  addGeneralConversation(){
    const new_topic = this.newConversation.toString();
    this.convService.createConversation(new_topic).subscribe(conv => {
      this.convService.createUserConversation(this.user.id, conv.id).subscribe(uc => {
        this.router.navigate(['chat'],{ queryParams: { id: conv.id }});
        this.addingConversation = false;
        this.generalChats.push(conv);
        this.user.userConversation.push(uc);
      });
    });
  }

  isChatJoined(chat: IConversation): boolean {
    let output = false;
    const result = this.user.userConversation.forEach(user_conv => {
      if( chat.id === user_conv.convID) {
        output = true;
      }
      // output = (chat.id === user_conv.convID) ? true : false;
    });
    return output;
  }

  isPMChatJoined(person: IUser): boolean {
    let output: boolean;
    // match person's conversations w topic 'PM' with one of your user conversations
    const their_pms: IConversation[] = [];
    this.pms.forEach(pm => {
      person.userConversation.forEach(uc => {
        if (uc.convID === pm.id) { their_pms.push(pm); }
      });
    });
    their_pms.forEach(their_pm =>{
      this.user.userConversation.forEach(uc => {
        if (their_pm.id === uc.convID) { output = true; }
      });
    });
    return output;
  }


  ngAfterViewInit() {
    console.log('navbar general chats: ', this.generalChats)
  }

}
