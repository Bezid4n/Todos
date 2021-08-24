
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoList, TodoService, TypeStatus } from '../todo.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  // @Input() td:TodoList={id:-1,title:'',status:false};
  // @Input() i:number=0;




  constructor(private todoService:TodoService, private activatedRoute:ActivatedRoute) { }



  remove(id:number,status:boolean){
    this.todoService.removeTask(id,status);

  }
  update(id:number){
    this.todoService.updateStatus(id)

  }

  edit(id:number){
    this.todoService.editFlag(id)


  }
  toggleFlag(titleEdit:string,id:number){
    this.todoService.updateTitle(id, titleEdit);


  }

  ngOnInit(): void {
    // this.todos=this.todoService.todos;
    // this.todoService.todoChanged.subscribe(todos=>{
    //   this.todos=todos;
    // })
    // this.typeS=this.todoService.typeStatus;
    // this.activatedRoute.data.subscribe(d =>{
    //   if(d.status == 'active'){
    //     this.todos=this.todos.filter(x=> x.status==false)
    //   }
    //   else if(d.status == 'completed'){
    //     this.todos=this.todos.filter(x=> x.status==true)
    //   }
    // })
    this.todoService.getList().subscribe(resp=>{
      this.todos=resp;
    });
  }
  public todos:TodoList[]=[];
  public typeS:TypeStatus | undefined;

}
