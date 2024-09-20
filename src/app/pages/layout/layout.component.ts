import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink,UpperCasePipe,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent{
  userService = inject(UserService);
  router = inject(Router);
  isLogged : boolean = false;
  userRole:string='';
  fullUName:string='';
  userImage: string='';
  constructor(){
    this.checkLogin();
  }
  checkLogin(){
    this.userService.checkUser().subscribe({
      next:(res:any)=>{
       if(res.result)
       {
          this.isLogged = true;
          let currUser = res.resdata[0].uid;
          this.getUserInfo(currUser);
       }
       else
       {
        alert(res.error);
        this.router.navigateByUrl('login');
       }
      },
      error: (e:any)=>{
      }   
    });
  }
  getUserInfo(uid:string){
    this.userService.getUserInfo(uid).subscribe({
      next:(res:any)=>{
        this.fullUName = res.data[0].ufullname;
        this.userRole=res.data[0].urole;
        let urole = this.userRole;
        let active = res.data[0].is_active;
        this.userService.userObj$.next(res.data[0]);
        if(active==1){
          let cururl = this.router.url;
          if(urole=='User')
          {
            if(cururl == '/dashboard' || cururl == '/createUser' || cururl == '/user-list'){
              this.router.navigateByUrl('dashboard');
            }
            else
            {
              this.router.navigateByUrl(cururl);
            }
          }
          else
          {
              this.router.navigateByUrl(cururl);
          }
        }
        else
        {
          this.router.navigateByUrl('login');
        }
      }
    });   
  }
  logout(){
  const tokenVar =  localStorage.getItem('logTok');
  localStorage.removeItem('logTok');
  localStorage.removeItem('curUser');
  this.router.navigateByUrl('login');
  }
}