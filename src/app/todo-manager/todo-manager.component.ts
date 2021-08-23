import { Component, OnInit } from '@angular/core';
import { TodoList, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-manager',
  templateUrl: './todo-manager.component.html',
  styleUrls: ['./todo-manager.component.css']
})
export class TodoManagerComponent implements OnInit {

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todos=this.todoService.todos;
    this.todoService.todoChanged.subscribe(todos=>{
      this.todos=todos;
    })
  }

  public todos:TodoList[]=[];

}
