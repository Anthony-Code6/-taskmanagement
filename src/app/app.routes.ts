import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  {path:'**',pathMatch:'full',redirectTo:'login'},
  {path:'login',pathMatch:'full',component:LoginComponent},
];