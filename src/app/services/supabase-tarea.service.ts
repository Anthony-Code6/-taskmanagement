import { inject, Injectable } from '@angular/core';
import { SupabasesService } from './supabases.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseTareaService {

  private supabase_client=inject(SupabasesService).supabase



}
