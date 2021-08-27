import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TodoList, TodoService } from '../todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  implements OnInit{

  constructor(private todoService:TodoService,
    private ngxService: NgxUiLoaderService) { }



  ts=0;
  ngOnInit(): void {
    this.ts=this.todoService.itemLeft;
    this.todoService.itemChanged.subscribe(todos=>{
      this.ts=todos;
    })
  }

// allStatus(){
//   this.todoService.allTypeStatus();
// }

// activeStatus(){
//   this.todoService.activeTypeStatus();
// }

// completedStatus(){
//   this.todoService.completedTypeStatus();
// }

clear(){
  this.ngxService.start()
  this.todoService.clearCompleted().subscribe(()=>{
    this.ngxService.stop()
  })
}



}
