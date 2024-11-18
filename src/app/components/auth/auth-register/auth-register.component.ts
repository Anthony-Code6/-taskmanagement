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

  crearCuenta() {
    if (this.formulario.valid) {
      const email = this.formulario.controls['email'].value
      const password = this.formulario.controls['password'].value
      console.log(email, password);

      this.authSupaBase.logIn(email, password)
        .then((res: any) => {
          console.log(res);
          console.log(res.data.session);
        })
        .catch((err) => {
          console.log(err);

        })

    }
  }

}
