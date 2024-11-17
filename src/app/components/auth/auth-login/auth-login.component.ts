import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthSupabaseService } from '../../../services/auth-supabase.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {

  formulario!: FormGroup
  form = inject(FormBuilder)

  authSupaBase = inject(AuthSupabaseService)

  ngOnInit(): void {

    this.formulario = this.form.group({
      email: this.form.control('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: this.form.control('', [Validators.required])
    })

  }

  async autenticacion() {
    if (this.formulario.valid) {
      const email = this.formulario.controls['email'].value
      const password = this.formulario.controls['password'].value
      try {
        const result = await this.authSupaBase.signIn(email, password);
        console.log('Login successful', result);
      } catch (error) {
        console.error('Login error', error);
      }
    }
  }

}
