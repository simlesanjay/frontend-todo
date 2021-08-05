import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginServicesService} from "../../services/login-services.service.js";
import {AppRoutingModule} from "../../app-routing.module.js";
import {RouterModule, Routes,Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {HomeServiceService} from "../../services/home-service.service";
import {NgxSpinnerService} from "ngx-spinner";
@Component({
  selector: 'app-ey-todo-login',
  templateUrl: './ey-todo-login.component.html',
  styleUrls: ['./ey-todo-login.component.scss']
})
export class EyTodoLoginComponent implements OnInit {


  constructor(private spinnerService: NgxSpinnerService,
              private notifyService : NotificationService,
              private homeServiceService : HomeServiceService,private router: Router) {

  }
  users;
  ngOnInit(): void {

  }

  signIn(username:string,password:string) {
  console.log('sign in called',username +'password ='+ password);
    const res:any = this.homeServiceService.login(username,password)
     .subscribe((data:any)=>{
       console.log('data',data);
       if(data.statusCode == 200){
         return this.router.navigate(['/home']);
       }else{
       return this.notifyService.showError('Invalid credentials','')
       }

      // this.spinnerService.hide();
     });
     console.log('todoModel',res.data);

  // this.homeServiceService.login(username,password).subscribe(data=>{
  //
  //      console.log('todoModel',data)
  //   },error => {
  //     console.log(error);
  //   });



  }


}
