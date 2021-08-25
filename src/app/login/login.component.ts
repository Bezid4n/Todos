import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form = new FormGroup({});
  // model: any = {};
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[] = [
  //   {
  //     key: 'Email',
  //     type: 'input',
  //     templateOptions: {
  //       label: 'Email',
  //       required: true,
  //       type:'email',

  //     },
  //   },
  //   {
  //     key: 'Password',
  //     type: 'input',
  //     templateOptions: {
  //       label: 'Password',
  //       required: true,
  //       type: 'password',
  //     },
  //   }
  // ];
  public form: FormGroup;
  constructor(private authService:AuthService, private ngxService: NgxUiLoaderService) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
   }

  ngOnInit(): void {
  }

  onLogin(){
    this.ngxService.start()
    this.authService.login(this.form.value).subscribe(d=>{
      console.log(d);
      this.ngxService.stop()
    })
  }

}
