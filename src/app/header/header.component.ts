import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('inputTask')
  inputTask:ElementRef<HTMLInputElement> | undefined;

  constructor(private todoService:TodoService,
    private ngxService: NgxUiLoaderService) { }

  onCreateTodo(titleTask:string){
    if(this.inputTask){
      this.ngxService.start()
      this.todoService.AddList({title:titleTask,id:Math.random(),status:false,flagEdit:false})
      .subscribe(()=>{
        this.ngxService.stop()
      });
      this.inputTask.nativeElement.value="";
      this.todoService.itemCount();

    }

  }

  ngOnInit(): void {
  }

}
