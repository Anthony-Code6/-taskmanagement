import { inject, Injectable } from '@angular/core';
import { SupabasesService } from './supabases.service';
import { Work } from '../interfaces/work';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private works = new BehaviorSubject<Work[]>([])
  work_dinamic: Work[] = []

  private supabase_client = inject(SupabasesService).supabase


  // ++++++ MANEJO DINAMICO ++++++

  cleanWork() {
    this.work_dinamic = []
    this.works.next(this.work_dinamic)
  }

  setWork(work: Work) {
    this.work_dinamic.push(work)
    this.works.next(this.work_dinamic)
  }

  getWork(): Observable<Work[]> {
    return this.works.asObservable()
  }

  removeWork(id: Number | undefined) {
    let index = this.work_dinamic.findIndex((event) => event.id === id)
    if (index != -1) {
      this.work_dinamic.splice(index, 1)
      this.works.next(this.work_dinamic)
    }
  }

  updateWork(work: Work) {
    let index = this.work_dinamic.findIndex((event) => event.id === work.id as Number)
    if (index != -1) {
      this.work_dinamic[index].titulo = work.titulo
      this.work_dinamic[index].descripcion = work.descripcion

      this.works.next(this.work_dinamic)
    }
  }


  // ++++++ CONSULTAS Y METODOS CON SUPABASE ++++++

  async sellstWork(): Promise<{ work: Work[] | null; error: any }> {
    let { data, error } = await this.supabase_client
      .from('work')
      .select('*');

    if (error) {
      console.error('Error al leer los datos:', error.message);
      return { work: null, error };
    }

    // TypeScript infiere que `data` tiene el tipo `Work[]`
    return { work: data as Work[], error: null };
  }


  async dltWork(id: Number | undefined): Promise<{ error: any | null }> {
    const { error } = await this.supabase_client
      .from('work')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar el registro:', error.message);
      return { error };
    }

    console.log('Registro eliminado correctamente');
    return { error: null };
  }

  async addWork(work: Work): Promise<{ data: Work[] | null; error: any | null }> {
    const { data, error } = await this.supabase_client
      .from('work')
      .insert([work]) // Inserta un nuevo registro
      .select(); // Devuelve los datos insertados

    if (error) {
      console.error('Error al insertar datos:', error.message);
      return { data: null, error };
    }

    console.log('Datos insertados correctamente:', data);
    return { data: data as Work[], error: null };
  }

}
