import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../shared/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(){
    this.numbers = Array(15).fill(1).map((x,i)=>i);
  }
  numbers: any = [];
  getStyle(number){
    return`#${0o27543 + (number * 101020)}`;
  }
  getStyle2(number){
    return`#${312065 + (number * 0o20324)}`;
  }
  getStyle3(number){
    return`#${400000 + (number * 0o46000)}`;
  }
  getStyle4(number){
      if (number<6)
        {return`#${363636 + (number * 100700)}`;}

      if (number >=6 && number <11)
        // { return`#${363636 + (number * 0o01010)}`;}
        { return`#${690000 + (number * 0o01111)}`;}
      if (number >=11 && number <16)
        { return`#${790000 + (number * 0o00101)}`;}

  }
  getText(number:number):string {
    switch(number){
      case 1:
        return 'Welcome to the wonderful world of ChatDB.';
      case 3:
        return 'Are you ready to chat?';
      case 5:
        return 'Of course you are.';
      case 7:
        return 'Your life will never be the same.';
    }
  }
  ngOnInit(){

  }
}
