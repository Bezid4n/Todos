import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('inputTask')
  inputTask:ElementRef<HTMLInputElement> | undefined;

  constructor(private todoService:TodoService) { }

  onCreateTodo(titleTask:string){
    if(this.inputTask){
      this.todoService.AddList({title:titleTask,id:Math.random(),status:false,flagEdit:false});
      this.inputTask.nativeElement.value="";
      this.todoService.itemCount();
    }

  }

  ngOnInit(): void {
  }

}
