import { Injectable } from '@angular/core';
import {TodoModel} from "../model/todoModel.js";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../GlobalConstants";

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) {

  }

  private todoModel = new TodoModel();
  saveToDo(todoModel: TodoModel) {
    const headers={'content-type':'application/json'}
    const body=JSON.stringify(todoModel);
   /* let baseUrl = 'http://localhost:8080/api/';
    console.log('it is login',baseUrl+'todo/saveTodo');
    console.log('it is body',body);*/
    return this.http.post(GlobalConstants.BASE_API_ENDPOINT+'/todo/saveTodo',body,{'headers':headers});

  }

  login(user: string,pwd: string){
    const headers={'content-type':'application/json'};
    return this.http.post(GlobalConstants.BASE_API_ENDPOINT+'/user/getUserDetails/'+user+'/'+pwd,{headers});
  }
  remove(id:string){
    const headers={'content-type':'application/json'};
    return this.http.delete(GlobalConstants.BASE_API_ENDPOINT+'/todo/deleteTodo/'+id);
  }

  updateCell(todoModel: TodoModel){
    const headers={'content-type':'application/json'}
    const body=JSON.stringify(todoModel);
    let baseUrl = 'http://localhost:8080/api/';
    console.log('it is updateCell',GlobalConstants.BASE_API_ENDPOINT+'/todo/updateTodo');
    console.log('body',body);
    return this.http.post(baseUrl+'/todo/updateTodo',body,{'headers':headers});
  }

  getToDo() : Observable<TodoModel[]> {
    let baseUrl = 'http://localhost:8080/api/';
   return this.http.get<TodoModel[]>(baseUrl+'todo/getTodo');

  }
}
