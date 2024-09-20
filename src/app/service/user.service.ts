import { HttpClient, HttpHeaders, HttpParams, withFetch} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userObj$  =  new BehaviorSubject<User>(new User);
  get user$(): Observable<User> { 
    return this.userObj$.asObservable();
  }
  get user() : User { 
    return this.userObj$.getValue()
  }
  constructor(private http:HttpClient) { }
  onLogin(obj:any){
    return this.http.post(Constant.API_END_Points + Constant.METHODS.LOGIN_USERS,obj);
  }
  getUsers(){
    return this.http.get(Constant.API_END_Points + Constant.METHODS.GET_ALL_USERS);
  }
  signUpUsers(userFrm:any){
    return this.http.post(Constant.API_END_Points + Constant.METHODS.SIGNUP_USER,userFrm);
  }
  createNewUsers(userObj:any){
    return this.http.post(Constant.API_END_Points + Constant.METHODS.CREATE_USER,userObj);
  }
  updateUsers(userObj:any){
    return this.http.post(Constant.API_END_Points + Constant.METHODS.UPDATE_USER,userObj);
  }
  getUserInfo(uid:string){
    let params = new HttpParams();
    let num_uid = Number(uid);
    params = params.set('uid',num_uid);
    return this.http.post(Constant.API_END_Points + Constant.METHODS.GET_USER_DETAIL,params);
  }
  checkUser(){
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    const tokenVar =  localStorage.getItem('logTok');
    let params = new HttpParams();
    params = params.set('token',`${tokenVar}`);
   return this.http.post(Constant.API_END_Points + Constant.METHODS.VER_TOK,params,{'headers':myheader});
  }
  uploadfile(fobj:any,headers:any){
    return this.http.post(Constant.API_END_Points + Constant.METHODS.UPLOAD,fobj,headers);
   }
   deleteUser(user:number){
    let params = new HttpParams();
    let num_uid = Number(user);
    params = params.set('uid',num_uid);
    return this.http.post(Constant.API_END_Points + Constant.METHODS.DELETE_USER,params);
   }
}