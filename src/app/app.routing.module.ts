import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { BodyComponent } from "./body/body.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { TodoManagerComponent } from "./todo-manager/todo-manager.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes:Routes = [
  { path: '', component: HomeComponent,children:[

    { path: 'todos', component: TodoManagerComponent, children:[
      {path:'all', data:{status:'all'}, component: BodyComponent},
      {path:'active', data:{status:'active'}, component: BodyComponent },
      {path:'completed', data:{status:'completed'}, component: BodyComponent },
     ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', component: WelcomeComponent },
  ] },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },


]
@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class appRoutingModule{}
