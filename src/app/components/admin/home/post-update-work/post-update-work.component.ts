import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Work } from '../../../../interfaces/work';
import { AuthSupabaseService } from '../../../../services/auth-supabase.service';

@Component({
  selector: 'app-post-update-work',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './post-update-work.component.html',
  styleUrl: './post-update-work.component.scss'
})
export class PostUpdateWorkComponent {

  formulario_work = output<Work>()
  editWork = input<Work>()

  userDetails = inject(AuthSupabaseService).getUserDetail()
  routerActive = inject(ActivatedRoute)

  formulario!: FormGroup
  form = inject(FormBuilder)

  idWork!: number
  titulo!: string

  constructor() {
    this.routerActive.params.subscribe(paran => {
      if (paran['id'] > 0) {
        this.titulo = 'Editar Area de Trabajo'
        this.idWork = paran['id']
      } else {
        this.titulo = 'Crear Nueva Area de Trabajo'
        this.idWork = 0
      }
    })

    this.formulario = this.form.group({
      titulo: this.form.control('', [Validators.required]),
      descripcion: this.form.control('', [Validators.required])
    })

    effect(() => {
      // Retona la informacion del area de trabajo
      const data = this.editWork()
      if (data != undefined) {
        this.detailWork()
      }
    })
  }


  detailWork() {
    this.formulario.controls['titulo'].setValue(this.editWork()?.titulo)
    this.formulario.controls['descripcion'].setValue(this.editWork()?.descripcion)
  }

  submitWork() {
    let formulario: Work

    if (this.formulario.valid) {

      if (this.idWork > 0) {
        formulario = {
          id: this.idWork,
          titulo: this.formulario.controls['titulo'].value,
          descripcion: this.formulario.controls['descripcion'].value,
          uidUser: this.userDetails?.id
        }
      } else {
        formulario = {
          titulo: this.formulario.controls['titulo'].value,
          descripcion: this.formulario.controls['descripcion'].value,
          uidUser: this.userDetails?.id
        }
      }

      this.formulario_work.emit(formulario)
    }
  }
}
