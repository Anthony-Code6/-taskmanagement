import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthSupabaseService } from '../../../services/auth-supabase.service';

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

  router = inject(Router)
  authSupaBase = inject(AuthSupabaseService)

  ngOnInit(): void {

    this.formulario = this.form.group({
      email: this.form.control('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: this.form.control('', [Validators.required])
    })

  }

  autenticacion() {
    if (this.formulario.valid) {
      const email = this.formulario.controls['email'].value
      const password = this.formulario.controls['password'].value

      // console.log(email, password);

      this.authSupaBase.logIn(email, password)
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

}
