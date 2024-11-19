import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { notAuthGuardGuard } from './guards/not-auth-guard.guard';
import { CreateUpdateWorkComponent } from './pages/admin/create-update-work/create-update-work.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [notAuthGuardGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [notAuthGuardGuard] },

  {
    path: 'administrador/home', component: HomeComponent, canActivate: [authGuardGuard]
  },
  {
    path: 'administrador/home/work/create', component: CreateUpdateWorkComponent, canActivate: [authGuardGuard]
  },
  {
    path: 'administrador/home/work/:id/edit', component: CreateUpdateWorkComponent, canActivate: [authGuardGuard]
  }
];
