import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService, IConversation, IMessage, IUser } from '../shared/index';
import 'rxjs/add/operator/filter';
import {environment} from '../../environments/environment';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.scss']
})
export class ChatpanelComponent implements OnInit, OnChanges {

  constructor(private route: ActivatedRoute, private convService: ConversationService) {}
  env = environment;
  convID: string;
  conversation: IConversation;
  messages: IMessage[];
  user: any;
  users: any;

  postMessage(inputPanel: NgForm) {
    const body_obj: any =
      {
        Body: inputPanel.value.new_message,
        ConversationID: this.convID,
        AuthorID: this.env.userId
      };
    this.convService.saveMessage(body_obj).subscribe(resp => {
      this.init();
    });
  }

  init(){
    this.user = this.env.user;
    this.users = this.env.users;
    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      this.convID = params.id;
      this.convService.getConversation(this.convID).subscribe(conv => {
        console.log('CONVERSATION - ', conv);
        this.conversation = conv[0];
      });
    });
  }
  ngOnChanges() {
    this.init();
  }
  ngOnInit() {
    this.init();

  }
  getUser(msg:IMessage):IUser{
    return this.env.users ? this.env.users.filter(user => user.id === msg.authorID)[0] : '';
  }

}
