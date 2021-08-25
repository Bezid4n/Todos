import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  token= new BehaviorSubject(localStorage.getItem('AppToken'))
  login(data:{email:string, pass:string}){
    return this.httpClient.post<{token:string}>(environment.apiBase+'auth/login',data)
    .pipe(tap(t =>{
      localStorage.setItem('AppToken',t.token);
      this.token.next(t.token);
    }));
  }

  logout(){

      localStorage.removeItem('AppToken');
      this.token.next(null);
  }
}
