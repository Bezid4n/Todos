import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'Email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        required: true,
        type:'email',

      },
    },
    {
      key: 'Password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        required: true,
        type: 'password',
      },
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
