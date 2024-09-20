import { CommonModule, DOCUMENT, JsonPipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../models/users';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,UpperCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  isLogged:boolean=false
  http = inject(HttpClient);
  title:string = 'Welcome Home';
  userService = inject(UserService);
  router = inject(Router);
  oldImg:string='';
  userImage:string= '';
  userPath:string= 'profile/';
  @Input() currUser : User = new User;
  @ViewChild('uimage') fileInput!: ElementRef;
  uid:number=0;
  status: "wait" | "uploading" | "success" | "fail" | "initial"= "initial";
  file:File | null = null;
  constructor() {
    this.userService.userObj$.subscribe((userObj:User)=>{
      if(!!User){
        this.currUser = userObj;
        if(userObj.uid!=0)
        {
          this.isLogged=true;
          this.uid = userObj.uid;
          this.oldImg = userObj.uimage;
          if(this.oldImg == null)
          {
            this.userImage='';
          }
          else
          {
            this.userImage=this.userPath + userObj.uimage; //file not display first time pending.
          }
          
        }
      }
    })
  }
  onFileSelected(event:any){
      const file :File = event.currentTarget.files[0];
      if(file){
        this.status ='wait';
        this.file = file;
      }
  }
  saveFile(){
    if(this.file){
      this.status='uploading';
      let curId=String(this.uid);
      const formObj = new FormData();
      formObj.append('file',this.file,this.file.name);
      formObj.append('uid',curId);
      formObj.append('old_img',this.oldImg);
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.userService.uploadfile(formObj,headers).subscribe((res:any)=>{
        if(res.result)
        {
          this.status = 'success';
            alert(res.message);
            this.userImage = this.userPath + res.file;
            this.file=null;
            this.fileInput.nativeElement.value = '';
            
        }
        else
        {
          this.status = 'fail';
          alert(res.error);
        }
    });
    }
    else
    {
      alert('Choose file to upload');
    }
  }
}