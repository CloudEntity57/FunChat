import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor() { }

  createHubConnection(route: string){
    return new HubConnectionBuilder()
    .withUrl(route,{skipNegotiation:true,transport: HttpTransportType.WebSockets})
    .build();
  }
}
