import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { TodoManagerComponent } from './todo-manager/todo-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { appRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { InterceptorService } from './interceptor.service';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    TodoManagerComponent,
    NotFoundComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    appRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true },
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyBootstrapModule,
    HttpClientModule,
    NgxUiLoaderModule,
    ReactiveFormsModule

  ],
  providers: [{useClass:InterceptorService, provide:HTTP_INTERCEPTORS, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
