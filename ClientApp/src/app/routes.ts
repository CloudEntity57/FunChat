import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ConversationComponent } from './conversation/conversation.component';

export const appRoutes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ConversationComponent, canActivate: [AuthGuard] },
  { path: 'log_in', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
