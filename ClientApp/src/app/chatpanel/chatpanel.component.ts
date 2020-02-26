import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService, IConversation, IMessage, IUser } from '../shared/index';
import 'rxjs/add/operator/filter';
import {environment} from '../../environments/environment';
import { NgForm, NgModel } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.scss']
})
export class ChatpanelComponent implements OnInit, OnChanges {

  constructor(private route: ActivatedRoute, private convService: ConversationService) {
    this.convService.user.subscribe(usr => {
      console.log('got user - ',usr)
      this.user = usr;
    });
    this.convService.users.subscribe(usrs => {
      this.users = usrs;
    });
  }
  env = environment;
  convID: string;
  conversation: IConversation;
  messages: IMessage[];
  user: any;
  users: any;

  getUser(msg: IMessage): IUser {
    return this.users.filter(user => user.id === msg.authorID)[0];
  }

  postMessage(inputPanel: NgForm) {
    const body_obj: any = {
        Body: inputPanel.value.new_message,
        ConversationID: this.convID,
        AuthorID: this.user.id
      };
    this.convService.saveMessage(body_obj).subscribe(resp => {
      this.init();
      inputPanel.reset();
    });
  }

  // gets the chat id from the URL and queries the DB for new chat messages,
  // enters a name or ID in service for the current chat,
  // based on whether it's private or general
  init() {
    const chatpanel = document.querySelector('.chat_window');
    chatpanel.scrollTop = chatpanel.scrollHeight;
    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      if ( params.id ) {
        this.convID = params.id;
        this.convService.getConversation(this.convID).subscribe(conv => {
          this.conversation = conv[0];
          if (conv[0].topic === 'PM') {
            conv[0].userConversation.forEach(uc =>{
              if ( uc.userID !== this.user.id ) {
                const name = this.users.filter(usr => usr.id === uc.userID )[0].firstName;
                this.convService.convIDChange(name);
              }
            });
          } else {
            this.convService.convIDChange(conv[0].id);
          }
          setTimeout(() => {
            chatpanel.scrollTop = chatpanel.scrollHeight;
          }, 20);
        });
      }
    });
  }


  ngOnChanges() {
    this.init();
  }
  ngOnInit() {
    this.init();
  }


}
