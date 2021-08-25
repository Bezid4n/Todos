import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  login(data:{email:string, pass:string}){
    return this.httpClient.post(environment.apiBase+'auth/login',data);
  }
}
