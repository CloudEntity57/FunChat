import { Injectable, Inject } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string;
  userProfile: any;
  user: Subject<IUser> = new Subject<IUser>();
  users: Subject<IUser[]> = new Subject<IUser[]>();

  constructor(private auth: AuthService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
    // this.auth.userProfile$.pipe(
    //   mergeMap(user => this.getUser(user.id))
    // );
  }
  createUser(profile: any): Observable<IUser>{
    console.log('NEW USER: ',profile)
    const newUser: any = {
      Email: profile.email,
      UserID: profile.sub,
      FirstName: profile.nickname,
      LastName: ''
    }
    console.log('newUser: ',newUser)
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json; charset=utf-8');
    const body: any = newUser;
    console.log('body: ',body)


    return this.http.post<IUser>(`${this.url }/User`,body, {headers}).pipe(
      map(res => res)
    )
  }
  getUsers(): Observable<any>{
    return this.http.get(this.url+'/User').pipe(
      map(users => users)
    );
  }
  userChange(newuser: IUser){
    this.user.next(newuser);
  }
  saveUsers(newUsers: IUser[]){
    this.users.next(newUsers);
  }
}
