import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IConversation, IMessage } from '../shared/index';

@Injectable()
export class ConversationService {

  url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
  }

  getConversation(id: string): Observable<IConversation>{
    return this.http.get<IConversation>(`${this.url}/Conversation/${id}`).pipe(
      map(conv => {
        conv[0].message.sort((c,d) => d.messageTimeStamp - c.messageTimeStamp);
        return conv;
      })
    );
  }
  saveMessage(body: any): Observable<IMessage> {
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json; charset=utf-8');

    return this.http.post<IMessage>(`${this.url}/message`, body, { headers }).pipe(
      map(msg => msg)
    );
  }
  // getMessages(): Observable<IMessage[]>{
  //   return this.http.get<IMessage[]>(`${this.url}/message`)
  // }
}
