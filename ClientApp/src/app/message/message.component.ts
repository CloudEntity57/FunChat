import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {environment} from '../../environments/environment';
import { IUser, IMessage, ConversationService } from '../shared/index';
import moment = require('moment');

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() msg: any;
  @Input() name: string;
  @Input() user: IUser;
  @Output() deleted: EventEmitter<void> = new EventEmitter();
  constructor(private convService: ConversationService) {
   }
  show_options = false;


  isMyId(id: string){
    return id === this.user.id;
  }

  deleteMe() {
    this.convService.deleteMessage(this.msg.id).subscribe(resp => {
      this.deleted.emit();
    });
  }

  showDate(timeStamp: string) {
    return moment(timeStamp).format('lll');
  }

  showOptions() {
    this.show_options = true;
  }
  hideOptions() {
    this.show_options = false;
  }

  ngOnInit() {
  }

}
