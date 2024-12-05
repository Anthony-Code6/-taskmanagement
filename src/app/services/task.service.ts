import { inject, Injectable } from '@angular/core';
import { SupabasesService } from './supabases.service';
import { Task } from '../interfaces/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private supabase_client = inject(SupabasesService).supabase

  /* ++++++ CONSULTAS Y METODOS CON SUPABASE ++++++ */

  async sellstTask(id: number): Promise<Task[]> {
    let { data, error } = await this.supabase_client
      .from('task')
      .select('*')
      .eq('task_id', id)
      .order('id', {
        ascending: false
      });

    if (error) {
      console.error('Error fetching tasks:', error);
      throw new Error(error.message);
    }

    return data as Task[];
  }


  async addTask(task: Task): Promise<Task> {
    const { data, error } = await this.supabase_client
      .from('task')
      .insert([task]) // Inserta un nuevo registro
      .select() // Devuelve los datos insertados
      .order('id', { ascending: false }) // Opcional, ordenar por la columna incremental
      .limit(1);

    if (error) {
      throw new Error(error.message)
    }
    //console.log('Datos insertados correctamente:', data);
    return data[0] as Task
  }

  async dltTask(id: Number): Promise<any> {
    const { error } = await this.supabase_client
      .from('task')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar el registro:', error.message);
      throw new Error(error.message)
    }
    console.log('Registro eliminado correctamente');
    return '';
  }

  async updTask(id: number, update: Task) {
    const { data, error } = await this.supabase_client
      .from('task')
      .update({ estado: update.estado }) // Solo envía los campos que necesitas actualizar
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error al eliminar el registro:', error.message);
      throw new Error(error.message)
    }

    console.log('Registro actualizco correctamente');
    return data as Task;
  }
}
