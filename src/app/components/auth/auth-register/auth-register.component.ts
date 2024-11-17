import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthSupabaseService } from '../../../services/auth-supabase.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})
export class AuthRegisterComponent {
  formulario!: FormGroup
  form = inject(FormBuilder)

  authSupaBase = inject(AuthSupabaseService)

  ngOnInit(): void {

    this.formulario = this.form.group({
      email: this.form.control('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: this.form.control('', [Validators.required])
    })

  }

  async crearCuenta() {
    if (this.formulario.valid) {
      const email = this.formulario.controls['email'].value
      const password = this.formulario.controls['password'].value
      console.log(email, password);

      try {
        const result = await this.authSupaBase.signUp(email, password);
        console.log('Registration successful', result);
      } catch (error) {
        console.error('Registration error', error);
      }
    }
  }

}
