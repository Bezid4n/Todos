import { EventEmitter, Injectable} from '@angular/core';
import {  Router } from '@angular/router';


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


  public todos:TodoList[]=[];

 typeStatus:TypeStatus="all";

 itemLeft=0;

itemCount(){
      this.itemLeft=this.todos.length;
      this.itemChanged.emit(this.itemLeft);
      console.log(this.itemLeft)
}


  constructor(private router:Router) { }

  AddList(newTask:TodoList){
    this.todos.push({...newTask ,id:Math.random()});
    this.router.navigate(['/todos','all']);
  }

  removeTask(id:number,status:boolean){
    this.todos=this.todos.filter(x=> x.id !==id)
    this.todoChanged.emit(this.todos)
    if(!status){
    this.itemLeft=this.itemLeft-1;
    this.itemChanged.emit(this.itemLeft);
    }

  }

  updateStatus(id:number){
    this.todos[id].status=!this.todos[id].status;
    if(this.todos[id].status){
      this.itemLeft=this.itemLeft-1;
    this.itemChanged.emit(this.itemLeft);
    }
    else{
      this.itemLeft=this.itemLeft+1;
    this.itemChanged.emit(this.itemLeft);
    }
  }
  updateTitle(id:number,title:string){
    this.todos[id].title=title;
    this.todos[id].flagEdit=!this.todos[id].flagEdit;

  }
  editFlag(id:number){
    this.todos[id].flagEdit=!this.todos[id].flagEdit;
  }

  allTypeStatus(){
    this.typeStatus="all";
  }

  activeTypeStatus(){
    this.typeStatus="active";
  }

  completedTypeStatus(){
    this.typeStatus="completed";
  }

  clearCompleted(){
    this.todos=this.todos.filter(x=>x.status == false)
    this.todoChanged.emit(this.todos)
  }

}