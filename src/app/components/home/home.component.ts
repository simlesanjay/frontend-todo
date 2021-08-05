import {Component, Input, OnInit} from '@angular/core';
import {TodoModel} from "../../model/todoModel.js";
import {HomeServiceService} from "../../services/home-service.service.js";
import {Observable} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private todoModel;
   getRowNodeId;
   defaultColDef;
   editType;
  @Input()
  logginuser: string = 'test1';
  private selectedRow;
  columnDefs = [
    {headerName: 'Title', field: 'title'},
    {headerName: 'Description', field: 'description'},
    {headerName: 'Modfiedby', field: 'modifiedby'}
  ];

  constructor(private homeServiceService : HomeServiceService,
              private notifyService : NotificationService) {

    this.defaultColDef = {
      flex: 1,
      editable: true,
    };
  }


  rowData: [];

  ngOnInit(): void {
    this.getList();
  }


  saveToDoList(title: string,description:string){
    this.todoModel = new TodoModel();
    this.todoModel.title = title;
    this.todoModel.description = description;
    this.todoModel.modifiedby = 'test1';
    this.todoModel.modifiedon = new Date();

    console.log('this.todoModel',this.todoModel);
    this.homeServiceService.saveToDo(this.todoModel)
      .subscribe((data:any)=>{
      console.log('inside save',data);
      if(data.statusCode == 200){
        this.notifyService.showSuccess('saved sucessfully','success');
        this.getList();
      }else{
        this.notifyService.showError('unable to save','failure');
      }
    });

  }
  removeFromToDo(event){
    console.log('this.selectedRow',this.selectedRow);
    this.homeServiceService.remove(this.selectedRow.id)
      .subscribe((data:any)=>{
        if(data.statusCode == 200){
          this.notifyService.showWarning('removed sucessfully','success');
          this.getList();
        }else{
          this.notifyService.showError('unable to save','failure');
        }
      });
  }
  onclickRow(param){
    console.log('param',param.data);
    this.selectedRow = param.data;
  }
  onCellValueChanged(event) {
    this.todoModel = new TodoModel();
    this.todoModel.id = event.data.id;
    this.todoModel.title = event.data.title;
    this.todoModel.description = event.data.description;
    this.todoModel.modifiedon = new Date();
    this.todoModel.modifiedby = event.data.modifiedby;
    console.log('param',this.todoModel);
      this.homeServiceService.updateCell(this.todoModel).subscribe((data:any)=>{
        if(data.statusCode == 200){
          this.notifyService.showSuccess('updated sucessfully','success');
          this.getList();
        }else{
          this.notifyService.showError('unable to save','failure');
        }

      });

  }

  onRowValueChanged(event) {
    var data = event.data;
    console.log(
      'onRowValueChanged: (' +
      data.title +
      ', ' +
      data.model +
      ', ' +
      data.price +
      ', ' +
      data.field5 +
      ')'
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private getList() {

    fetch('http://localhost:8080/api/todo/getTodo/'+this.logginuser)
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }
}
