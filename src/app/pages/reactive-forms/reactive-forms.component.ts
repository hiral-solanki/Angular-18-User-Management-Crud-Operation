import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule,JsonPipe],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {
  isLoggged:boolean = false;
  loginForm: FormGroup = new FormGroup({
    username : new FormControl("",[Validators.required,Validators.minLength(3)]),
    upassword : new FormControl("",[Validators.required,Validators.minLength(5)])
  });
  userForm:FormGroup = new FormGroup({
    username: new FormControl("",[Validators.required,Validators.minLength(3)]),
    uremail: new FormControl("",[Validators.required,Validators.email]),
    upassword: new FormControl("",[Validators.required,Validators.minLength(5)]),
    urole: new FormControl("User"),
    is_active: new FormControl(1),
    fullname: new FormControl(""),
  });
  http = inject(HttpClient);
  userService = inject(UserService)
  router = inject(Router)
  loginFormVal:any;
  regFormVal:any;
  constructor(){
    const tokenVar =  localStorage.getItem('logTok');
    //this.router.navigate(['login']);
    if(tokenVar!=null){
      this.userService.checkUser().subscribe({
        next:(res:any)=>{
         if(res.result){
          this.isLoggged = true;
          alert('Already Logged in!');
          this.router.navigateByUrl('dashboard');
        }
        }
      });
    }
   }
  onLoginSave(){
    this.loginFormVal = this.loginForm.value;
    this.userService.onLogin(this.loginFormVal).subscribe({
      next: (res:any) => {
       if(res.result)
       {
          alert('Login Success');
          this.isLoggged = true;
          let curId =String(res.data.uid); 
          localStorage.setItem('curUser',curId);
          localStorage.setItem('logTok',res.authTok);
          this.router.navigateByUrl('dashboard');
       }
       else
       {
          alert(res.error);
       }
      },
      error:(e:any) =>{
        alert(e.error);
      }
    });
  }
  onUserRegSave(){
    this.regFormVal = this.userForm.value;
    this.userService.signUpUsers(this.regFormVal).subscribe({
      next: (res:any) => {
       if(res.result)
       {
          alert('Register Success');
          window.location.reload();
       }
       else
       {
          alert(res.error);
       }
      },
      error:(e:any) =>{
        alert(e.error);
      }
    });
  }
}