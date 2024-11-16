import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SupabaseTareaService {

  supabase:SupabaseClient=createClient(Environments.supabaseUrl,Environments.supabaseKeySecret)
}
