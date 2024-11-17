import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService {

  private supabase: SupabaseClient

  constructor() {
    const supabaseUrl = 'https://gjnxofvtrllvefchqlzo.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbnhvZnZ0cmxsdmVmY2hxbHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3ODM2MjIsImV4cCI6MjA0NzM1OTYyMn0.KTBa66zSfYV3tY42OhFGrpghOUnaCdAuwauvrVx4B5I';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }



  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }


  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password })
  }

}
