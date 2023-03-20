import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home/home.component';
import { RolesComponent } from './components/roles/roles.component';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './components/home/users/users.component';
import { ShowUserComponent } from './components/home/users/show-user/show-user.component';
import { ShowRoleComponent } from './components/roles/show-role/show-role.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: "users",component: UsersComponent,canActivate: [AuthGuard],},
  {path: "users/:userId",component: ShowUserComponent,canActivate: [AuthGuard],},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },    
  {path: "config/roles",component: RolesComponent,canActivate: [AuthGuard],},
  {path: "config/roles/:roleId",component: ShowRoleComponent,canActivate: [AuthGuard],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
