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

}
