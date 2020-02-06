import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.scss']
})
export class ChatpanelComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  chatID: string;

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params =>{
      this.chatID = params.id;
    });
  }

}
