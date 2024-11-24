import { inject, Injectable } from '@angular/core';
import { SupabasesService } from './supabases.service';
import { Work } from '../interfaces/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private supabase_client = inject(SupabasesService).supabase


  // ++++++ CONSULTAS Y METODOS CON SUPABASE ++++++

  async sellstWork(): Promise<Work[]> {
    let { data, error } = await this.supabase_client
      .from('work')
      .select('*')
      .order('id', {
        ascending: true
      });

    if (error) {
      console.error('Error al leer los datos:', error.message);
      throw new Error(error.message)
    }
    return data as Work[]
  }

  async gettWork(id: number): Promise<Work> {
    let { data, error } = await this.supabase_client
      .from('work')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error al leer los datos:', error.message);
      throw new Error(error.message)
    }
    return data as Work
  }


  async dltWork(id: Number): Promise<any> {
    const { error } = await this.supabase_client
      .from('work')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar el registro:', error.message);
      throw new Error(error.message)
    }
    console.log('Registro eliminado correctamente');
    return '';
  }

  async addWork(work: Work): Promise<Work[]> {
    const { data, error } = await this.supabase_client
      .from('work')
      .insert([work]) // Inserta un nuevo registro
      .select(); // Devuelve los datos insertados

    if (error) {
      console.error('Error al insertar datos:', error.message);
      throw new Error(error.message)
    }

    console.log('Datos insertados correctamente:', data);
    return data as Work[]
  }

  async updWork(id: number, updatedWork: Work) {
    const { data, error } = await this.supabase_client
      .from('work')
      .update(updatedWork) // Solo envía los campos que necesitas actualizar
      .eq('id', id)
      .select()
      .single(); // Devuelve el registro actualizado

    if (error) {
      console.error('Error al actualizar el registro:', error.message);
      throw new Error('No se pudo actualizar el registro');
    }

    return data as Work; // Asegúrate de que coincide con la interfaz
  }

}
