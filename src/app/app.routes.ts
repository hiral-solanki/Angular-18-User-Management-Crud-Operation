import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsComponent } from './pages/reactive-forms/reactive-forms.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full' 
    },
    {
        path:'login',
        component:ReactiveFormsComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate:[authGuard]
      
            },
           {
                path:'user-list',
                component:UserListComponent,
                canActivate:[authGuard]
            },
            {
                path:'createUser',
                component:CreateUserComponent,
                canActivate:[authGuard]
            },
            {
                path:'updateUser',
                component:CreateUserComponent,
                canActivate:[authGuard]
            } ,
            {
                path:'**',
                component:PageNotFoundComponent,
                canActivate:[authGuard]
      
            }
        ]
    }
];
