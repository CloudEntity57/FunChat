import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IConversation, IMessage, IUserConversation, IUser } from '../shared/index';

@Injectable()
export class ConversationService {

  url: string;
  convID: Subject<string> = new Subject<string>();
  user: Subject<IUser> = new Subject<IUser>();
  users: Subject<IUser[]> = new Subject<IUser[]>();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
  }

  convIDChange(id:string){
    this.convID.next(id);
  }
  userChange(newuser: IUser){
    this.user.next(newuser);
  }
  saveUsers(newUsers: IUser[]){
    this.users.next(newUsers);
  }

  getConversation(id: string): Observable<IConversation> {
    return this.http.get<IConversation>(`${this.url}/Conversation/${id}`).pipe(
      map(conv => {
        conv[0].message.sort((c, d) => d.messageTimeStamp - c.messageTimeStamp);
        return conv;
      })
    );
  }

  getPMs(): Observable<any> {
    return this.http.get(`${this.url}/Conversation/PM`).pipe(
      map(resp => resp)
    );
  }

  getGeneralConversations(): Observable<any>{
    return this.http.get(`${this.url}/Conversation/General`).pipe(
      map(chats => chats)
    );
  }

  createConversation(topic: string): Observable<IConversation> {
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json; charset=utf-8');
    const body: any = {
      topic
    };
    return this.http.post<IConversation>( `${this.url}/Conversation/`, body, { headers }).pipe(
      map(conversation => conversation)
    );
  }
  createUserConversation(userID: any, convID: any): Observable<IUserConversation> {
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json; charset=utf-8');
    const body: any = {
      userID,
      convID
    };
    return this.http.post<IUserConversation>(`${this.url}/UserConversation`, body, { headers }).pipe(
      map(uc => uc)
    );
  }
  saveMessage(body: any): Observable<IMessage> {
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json; charset=utf-8');

    return this.http.post<IMessage>(`${this.url}/message`, body, { headers }).pipe(
      map(msg => msg)
    );
  }
  deleteMessage(id: string): Observable<boolean> {
    const url = `${this.url}/message/${id}`;
    return this.http.delete(url).pipe(
      map(resp => true)
    );
  }


  // getMessages(): Observable<IMessage[]>{
  //   return this.http.get<IMessage[]>(`${this.url}/message`)
  // }
}
