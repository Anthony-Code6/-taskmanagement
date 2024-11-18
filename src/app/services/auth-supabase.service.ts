import { inject, Injectable } from '@angular/core';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { SupabasesService } from './supabases.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService {

  private supabase_client = inject(SupabasesService).supabase

  session() { }

  signUp(email: string, password: string) {
    return this.supabase_client.auth.signUp({ email, password })
  }


  logIn(email: string, password: string) {
    return this.supabase_client.auth.signInWithPassword({ email, password })
  }


  signOut() {
    return this.supabase_client.auth.signOut()
  }

}
