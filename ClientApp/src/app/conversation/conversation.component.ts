import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../shared/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private convService: ConversationService) { }
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
    // this.pms = this.convService.getPMs();
    // this.generalChats = this.convService.getGeneralConversations();
  }

}
