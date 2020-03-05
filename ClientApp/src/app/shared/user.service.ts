import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  createUser(user: any): any{
    console.log('NEW USER: ',user)
    // this.http.post()
  }
}
