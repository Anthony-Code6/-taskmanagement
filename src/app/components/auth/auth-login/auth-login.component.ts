import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthSupabaseService } from '../../../services/auth-supabase.service';
import { Login } from '../../../interfaces/auth';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {

  formulario!: FormGroup
  form = inject(FormBuilder)

  form_auth = output<Login>()

  constructor() {
    this.formulario = this.form.group({
      email: this.form.control('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: this.form.control('', [Validators.required])
    })
  }


  autenticacion() {
    if (this.formulario.valid) {
      const email = this.formulario.controls['email'].value
      const password = this.formulario.controls['password'].value

      let auth: Login = {
        email: email,
        password: password
      }

      this.form_auth.emit(auth)
    }
  }

}
