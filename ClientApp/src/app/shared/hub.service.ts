import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HttpTransportType, HubConnection } from '@aspnet/signalr';
import { AuthService } from '../auth.service';
// import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor(private auth: AuthService) {
    this.auth.getTokenSilently$().subscribe(token => {
      this.token = token;
    });
  }
  token:string;

  createHubConnection(route: string){

      const options = {
        skipNegotiation:true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: ()=>  this.token
      }
      console.log('yer this.token: ',this.token)
      return new HubConnectionBuilder()
      .withUrl(route,options)
      .build();

  }
}
