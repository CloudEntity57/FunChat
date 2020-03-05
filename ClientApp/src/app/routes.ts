import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatpanelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
