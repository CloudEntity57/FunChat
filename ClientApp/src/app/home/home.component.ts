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
    console.log('numbers - ',this.numbers)
  }
  numbers: any = [];
  getStyle(number){
    return`#${0o27543 + (number * 101020)}`;
  }
  getStyle2(number){
    return`#${312065 + (number * 0o20324)}`;

  }
  ngOnInit(){

  }
}
