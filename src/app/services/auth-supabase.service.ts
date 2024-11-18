import { inject, Injectable } from '@angular/core';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { SupabasesService } from './supabases.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService {

  private supabase_client = inject(SupabasesService).supabase

  session() {
    this.supabase_client.auth.getSession()
  }

  signUp(email: string, password: string) {
    return this.supabase_client.auth.signUp({ email, password })
  }


  logIn(email: string, password: string) {
    return this.supabase_client.auth.signInWithPassword({ email, password })
  }


  signOut() {
    return this.supabase_client.auth.signOut()
  }

  /* Manejo del token */

  isLoggeIn() {
    const token = this.getToken()
    if (!token) return false

    return !this.isTokenExpired()
  }

  private isTokenExpired() {
    const token = this.getToken()
    if (!token) return true

    const decode = jwtDecode(token)
    const isTokenExpired = Date.now() >= decode['exp']! * 1000
    if (isTokenExpired) this.logout()

    return isTokenExpired
  }

  logout() {
    localStorage.removeItem('token')
  }

  private getToken() {
    return localStorage.getItem('token')
  }
}
