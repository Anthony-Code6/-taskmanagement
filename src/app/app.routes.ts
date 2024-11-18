import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { notAuthGuardGuard } from './guards/not-auth-guard.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [notAuthGuardGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [notAuthGuardGuard] },

  {
    path: 'administrador/home', component: HomeComponent, canActivate: [authGuardGuard]
  }
];
