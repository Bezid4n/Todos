import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn=false;
  constructor(private authService:AuthService) {
    authService.token.subscribe(t =>{
      if(t){
        this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=false;
      }
    })
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
