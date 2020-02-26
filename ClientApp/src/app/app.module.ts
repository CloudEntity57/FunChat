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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ChatpanelComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    UserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ConversationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
