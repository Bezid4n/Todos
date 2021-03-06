import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable} from '@angular/core';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export type TypeStatus= 'all' | 'active' | 'completed';
export interface TodoList{
  id:number,
  title:string,
  status:boolean,
  flagEdit:boolean,
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todoChanged=new EventEmitter<TodoList[]>();
  public itemChanged=new EventEmitter<number>();


  public todos= new BehaviorSubject<TodoList[]>([]);

//  typeStatus:TypeStatus="all";

 itemLeft=0;

 public todoL:TodoList[]=[];

itemCount(){
      this.httpClient.get<TodoList[]>(environment.apiBase+'Todos').subscribe(data => {
        this.todoL=data;
        this.todoL=this.todoL.filter(x => x.status == false);
        this.itemLeft = this.todoL.length;
        this.itemChanged.emit(this.itemLeft);
        // console.log(this.itemLeft);
  })
      // this.itemLeft=this.todos.length;
      // this.itemChanged.emit(this.itemLeft);

}


  constructor(private router:Router, private httpClient:HttpClient) { }

  getList(){
    this.httpClient.get<TodoList[]>(environment.apiBase+'Todos')
    .subscribe(resp=>{
      this.todos.next(resp);
    })
    return this.todos;

  }

  AddList(newTask:TodoList){
     return this.httpClient.post<TodoList>(environment.apiBase + 'Todos',newTask)
     .pipe(tap(()=>{
       this.getList();
     }));
    // this.todos.push({...newTask ,id:Math.random()});
    // this.router.navigate(['/todos','all']);
  }

  removeTask(id:number,status:boolean){
    if(!status){
      this.itemLeft=this.itemLeft-1;
      this.itemChanged.emit(this.itemLeft);
      }

    return this.httpClient.delete<TodoList[]>(environment.apiBase + 'Todos/'+ id)
    .pipe(tap(()=>{
      this.getList();
    }));
    // this.todos=this.todos.filter(x=> x.id !==id)
    // this.todoChanged.emit(this.todos)


  }

  updateStatus(td:TodoList){
    return this.httpClient.put<TodoList[]>(environment.apiBase + 'Todos/'+ td.id,td)
     .pipe(tap(()=>{
      this.getList();
      if(td.status){
        this.itemLeft=this.itemLeft-1;
        this.itemChanged.emit(this.itemLeft);
      }
    else{
      this.itemLeft=this.itemLeft+1;
    this.itemChanged.emit(this.itemLeft);
    }
    }));
    // this.todos[id].status=!this.todos[id].status;
    // if(this.todos[id].status){

  }


  updateTitle(td:TodoList){
  return  this.httpClient.put<TodoList>(environment.apiBase + 'Todos/'+ td.id,td)
    .pipe(tap(()=>{
      this.getList();
    }));
    // this.todos[id].title=title;
    // this.todos[id].flagEdit=!this.todos[id].flagEdit;

  }
  editFlag(td:TodoList){
  this.httpClient.patch<TodoList>(environment.apiBase + 'Todos/'+ td.id,td.flagEdit=!td.flagEdit);
    // this.todos[id].flagEdit=!this.todos[id].flagEdit;
  }

  // allTypeStatus(){
  // //  this.typeStatus="all";
  // }

  // activeTypeStatus(){
  //   // this.typeStatus="active";
  // }

  // completedTypeStatus(){
  //   // this.typeStatus="completed";
  // }

  c=0;
  public d: TodoList[]=[];

  clearCompleted(){

    // this.todoL=this.todoL.filter(x=>x.status == false)
    // this.todoChanged.emit(this.todoL)
    this.httpClient.get<TodoList[]>(environment.apiBase+'Todos').subscribe(data => {
    this.d=data;
    this.d=this.d.filter(x => x.status == true);
     this.c = this.d.length;
    //  console.log(this.c);
     for (let i=0;i<this.c;i++){
      if(this.d[i]) {
        // console.log(this.d[i]);
        this.httpClient.delete<TodoList[]>(environment.apiBase + 'Todos/'+ this.d[i].id).subscribe(resp => {
          this.todoChanged.emit(resp);
        })
      }
     }
    })
    return this.httpClient.get<TodoList[]>(environment.apiBase+'Todos')
    .pipe(tap(()=>{
      this.getList();
    }));

  }

}
