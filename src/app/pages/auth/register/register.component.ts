import { Component, inject } from '@angular/core';
import { AuthRegisterComponent } from "../../../components/auth/auth-register/auth-register.component";
import { Router } from '@angular/router';
import { AuthSupabaseService } from '../../../services/auth-supabase.service';
import { Signup } from '../../../interfaces/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  router = inject(Router)
  authSupaBase = inject(AuthSupabaseService)

  async crearCuanta(event: Signup) {
    try {
      const response = await this.authSupaBase.signUp(event.email, event.password)

      this.router.navigate(['login'])

    } catch (err) {
      console.error(err)
    }
  }

}
