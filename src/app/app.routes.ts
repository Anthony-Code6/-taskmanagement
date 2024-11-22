import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { notAuthGuardGuard } from './guards/not-auth-guard.guard';
import { CreateUpdateWorkComponent } from './pages/admin/create-update-work/create-update-work.component';
import { NavbarComponent } from './shared/components/layouts/navbar/navbar.component';
import { WorkAreaComponent } from './pages/admin/work-area/work-area.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [notAuthGuardGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [notAuthGuardGuard] },


  {
    path: 'administrador/home', component: NavbarComponent, children: [

      // Vistas de mostrar, crear, actualizar y eliminar areas de trabajo
      {
        path: '', component: HomeComponent
      },
      {
        path: 'work/create', component: CreateUpdateWorkComponent
      },
      {
        path: 'work/:id/edit', component: CreateUpdateWorkComponent
      }

      // Vistas de las tareas de trabajo segun su area

      ,
      {
        path: ':id/work', component: WorkAreaComponent
      }
    ],
    canActivate: [authGuardGuard]
  }
];
