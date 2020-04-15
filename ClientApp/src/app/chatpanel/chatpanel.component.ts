import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService, IConversation, IMessage, IUser } from '../shared/index';
import {environment} from '../../environments/environment';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { HubConnection } from '@aspnet/signalr';
import { HubService } from '../shared/hub.service';

@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.scss']
})
export class ChatpanelComponent implements OnInit, OnChanges {

  constructor(private hubService: HubService, private route: ActivatedRoute, private convService: ConversationService, private userService: UserService) {
    this.userService.user.subscribe(usr => {
      console.log('got user - ',usr)
      this.user = usr;
    });
    this.userService.users.subscribe(usrs => {
      this.users = usrs;
    });
  }
  env = environment;
  convID: string;
  conversation: IConversation;
  messages: IMessage[];
  user: any;
  users: any;
  public hubConnection: HubConnection;

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
      console.log('posted - ',resp)
      this.echo();
      this.hubConnection.invoke("Send",body_obj);
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
    this.hubConnection = this.hubService.createHubConnection("https://localhost:5001/api/message");
    this.hubConnection.on("Send", (conv) => {
      this.conversation = conv;
    })
    this.hubConnection.start().then(()=>{console.log('connection started')}).catch(err => {console.error('start connection error: ',err)});
    this.init();
    console.log('our hub connection: ',this.hubConnection);

  }

  joinChat(){
    // this.hubConnection.hub.chatDBHub;
    // this.hubConnection.invoke("JoinRoom", this.convID);
  }

  echo(){
    this.hubConnection.invoke("Send", this.conversation);
  }


}
