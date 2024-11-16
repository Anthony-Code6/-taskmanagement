import { Component } from '@angular/core';
import { AuthLoginComponent } from '../../../components/auth/auth-login/auth-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
