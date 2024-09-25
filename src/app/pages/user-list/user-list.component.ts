import { ChangeDetectionStrategy, ChangeDetectorRef, Component,inject,OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, JsonPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/users';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink,UpperCasePipe,JsonPipe,RouterOutlet,CommonModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
//  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  userService = inject(UserService);
  router = inject(Router);
  userObj : User;
  userList: any  = [];
  userListFound:boolean = true;
  isVisible: boolean = false;
  isPanelShow:boolean=false;
  curPage:number=1;
  noOfRecPerPage:number=5;
  totalRec:number=0;
  totalPage:number=1;
  constructor(private aroute:ActivatedRoute){
    this.userObj = new User();
  }
  ngOnInit():void{
    this.loadUser(this.curPage);
  }
  openSidePanel(){
    this.isPanelShow = true;
  }
  
  closeSidePanel(){
    this.isPanelShow = false;
  }
  loadUser(cpage:number){
    this.isVisible = true;
    let page= this.curPage;
    this.userService.getUsers(cpage).subscribe({
      next: (res:any) => {
        this.userList = res.data;
        this.curPage = res.page;
        this.totalRec = res.totalRec;
        this.noOfRecPerPage=res.noOfRecPerPage;
        this.totalPage=res.totalPage;
        this.isVisible = false;
        this.userListFound = true; 
      },
      error:(e:any) =>{
        alert(e.error);
        this.userListFound = false;
      }
    });
  }
  onpageChange(page:number){
    this.curPage= page;
    this.loadUser(page);
  }
  setPagination(){
    return Array.from({length:this.totalPage},(_,i) => i+1);
  }
  edit(userObj:any){
    this.openSidePanel();
    this.userObj = userObj;
  }
  onUpdate(){
    this.userService.updateUsers(this.userObj).subscribe((res:any)=>{
       if(res.error){
         alert(res.error);
       }
       else
       {
        alert(res.message);
        this.closeSidePanel();
        this.loadUser(this.curPage);
        }
     });
  
  }
  delete(uid:any){
    var c = confirm('Are you sure you want to delete user?');
    if(c==true){
      this.userService.deleteUser(uid).subscribe({
        next:(res:any) => {
          if(res)
          {
            alert(res.message);
            this.loadUser(this.curPage);
          }
          else
          {
            alert(res.error);
          }
        }
      });
    }
    else
    {
      alert('User delete Cancel!');
    }
  }
}