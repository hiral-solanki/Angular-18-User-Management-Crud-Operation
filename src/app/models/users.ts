export class User{
    uid: number = 0;
    ufullname:string='';
    username:string ='';
    uremail: string ='';
    upassword:string='';
    udate_add:Date = new Date();
    udate_date:Date = new Date();
    uimage:string = '';
    urole: string = 'User';
    is_active:number = 1;
  }