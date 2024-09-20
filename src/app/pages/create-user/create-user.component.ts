import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/users';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule,JsonPipe],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  userObj:User;
  show:boolean=false;
  title:string = 'add new user';
  mode : string = 'C';
    constructor(){
      this.userObj = new User;
      let cururl = this.router.url;
      if(cururl == '/updateUser') {
        this.title = 'update profile';
        this.mode = 'E';
        this.userService.userObj$.subscribe((userObj:User)=>{
          if(!!User){
            this.userObj = userObj;
          }
        })
  
      }
    }
    ngOnInit(): void {
    }
    showPass(){
      this.show = !this.show;
    }
    onUpdate(){
      this.userService.updateUsers(this.userObj).subscribe((res:any)=>{
         if(res.error){
           alert(res.error);
         }
         else
         {
          alert(res.message);
          }
       });
    
    }
    onSave(){
      this.userService.createNewUsers(this.userObj).subscribe((res:any)=>{
        if(res.result)
        {
          alert('User Successfully Created');
          this.router.navigateByUrl('user-list');
        }
        else
        {
          alert(res.error);
        }
      })
    }
    validate(){

    }
}