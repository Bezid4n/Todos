
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';


import { TodoList, TodoService, TypeStatus } from '../todo.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  // @Input() td:TodoList={id:-1,title:'',status:false};
  // @Input() i:number=0;




  constructor(private todoService:TodoService, private activatedRoute:ActivatedRoute,
    private ngxService: NgxUiLoaderService) { }



  remove(id:number,status:boolean){
    this.ngxService.start()
    this.todoService.removeTask(id,status).subscribe(()=>{
      this.ngxService.stop()
    });

  }
  update(td:TodoList){
    this.todoService.updateStatus({id:td.id,title:td.title,flagEdit:td.flagEdit,status:!td.status}).subscribe(()=>{
      // this.ngxService.stop()
    });
  }

  edit(td:TodoList){
    this.todoService.editFlag(td);

  }
  toggleFlag(td:TodoList){
    this.ngxService.start()
    this.todoService.updateTitle(td).subscribe(()=>{
      this.ngxService.stop()
    });


  }

  ngOnInit(): void {
    // this.todos=this.todoService.todos;
    // this.todoService.todoChanged.subscribe(todos=>{
    //   this.todos=todos;
    // })

    this.todoService.itemCount();
    //  this.typeS=this.todoService.typeStatus;
    this.activatedRoute.data.subscribe(d =>{
      if(d.status == 'active'){
        // this.todos=this.todos.filter(x=> x.status==false)
        this.todoService.getList().subscribe(resp=>{
          this.todos=resp;
          this.todos=this.todos.filter(x=> x.status==false);
        });
      }
      else if(d.status == 'completed'){
        // this.todos=this.todos.filter(x=> x.status==true)
        this.todoService.getList().subscribe(resp=>{
          this.todos=resp;
          this.todos=this.todos.filter(x=> x.status==true);
        });
      }
      else if(d.status == 'all'){
        // this.todos=this.todos.filter(x=> x.status==true)
        this.todoService.getList().subscribe(resp=>{
          this.todos=resp;
        });
      }
    })
  }
  public todos:TodoList[]=[];
  // public typeS:TypeStatus | undefined;

}
