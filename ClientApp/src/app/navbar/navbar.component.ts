import { Component, OnInit, Input } from '@angular/core';
import { IUser, IConversation } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() user: IUser;
  @Input() users: IUser[];
  @Input() pms: IConversation[];

  joinPMChat(targetUser: IUser): void {
    let pmChatID: string;
    this.pms.filter(pm => {
      targetUser.userConversation.forEach(conv => {
        if (conv.convID === pm.id) {
          pmChatID = conv.convID;
        }
      });
    });
    console.log('pmchatID ',pmChatID)
    this.router.navigate(['chat'], { queryParams: { id: pmChatID}});
  }

  ngOnInit() {
  }

}
