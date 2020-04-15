import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import { ConversationService } from './shared/conversation.service';
import { MessageComponent } from './message/message.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';
import { ConversationComponent } from './conversation/conversation.component';
import { UserService } from './shared/user.service';
import { HubService } from './shared/hub.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ChatpanelComponent,
    MessageComponent,
    ProfileComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    UserModule,
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  providers: [
    AuthService,
    ConversationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    HubService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
