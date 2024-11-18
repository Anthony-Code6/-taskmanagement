import { inject, Injectable } from '@angular/core';
import { SupabasesService } from './supabases.service';
import { Work } from '../interfaces/work';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private supabase_client = inject(SupabasesService).supabase


  async sellstWork() {
    try {
      let { data: work, error } = await this.supabase_client
        .from('work')
        .select('*');

      if (error) {
        console.error('Error al leer los datos:', error.message);
        return { error };
      }

      return { work };
    } catch (error) {
      console.error('Error inesperado:', error);
      return { error };
    }
  }


}
