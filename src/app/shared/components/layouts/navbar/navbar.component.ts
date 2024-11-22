import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthSupabaseService } from '../../../../services/auth-supabase.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  authService = inject(AuthSupabaseService)
  router = inject(Router)

  async logout() {
    const response = await this.authService.signOut();
    if (response.error) {
     // this.message = 'Error al cerrar sesión: ' + response.error.message;
    } else {
     // this.message = 'Sesión cerrada correctamente.';
     this.authService.logout()
     this.router.navigate([''])
    }

  }


}
