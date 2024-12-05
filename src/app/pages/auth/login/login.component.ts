import { Component, inject } from '@angular/core';
import { AuthLoginComponent } from '../../../components/auth/auth-login/auth-login.component';
import { AuthSupabaseService } from '../../../services/auth-supabase.service';
import { Router } from '@angular/router';
import { Login } from '../../../interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router)
  authSupaBase = inject(AuthSupabaseService)


  autenticacion(event: Login) {
    this.authSupaBase.logIn(event.email, event.password)
      .then((res: any) => {
        // console.log(res);
        // console.log(res.data.session);
        // console.log(res.data.session['access_token']);
        // console.log(this.authSupaBase.session());
        localStorage.setItem('token', res.data.session['access_token'])
        this.router.navigate(['/administrador/home'])
      })
      .catch((err) => {
        console.log(err);

      })
  }
}
