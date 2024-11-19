import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Work } from '../../../../interfaces/work';
import { AuthSupabaseService } from '../../../../services/auth-supabase.service';

@Component({
  selector: 'app-post-update-work',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './post-update-work.component.html',
  styleUrl: './post-update-work.component.scss'
})
export class PostUpdateWorkComponent implements OnInit {

  formulario_work = output<Work>()

  userDetails = inject(AuthSupabaseService).getUserDetail()

  formulario!: FormGroup
  form = inject(FormBuilder)

  idWork: number = 0

  ngOnInit(): void {
    this.formulario = this.form.group({
      titulo: this.form.control('', [Validators.required]),
      descripcion: this.form.control('', [Validators.required])
    })
  }

  submitWork() {
    let formulario: Work

    if (this.formulario.valid) {
      formulario = {
        titulo: this.formulario.controls['titulo'].value,
        descripcion: this.formulario.controls['descripcion'].value,
        uidUser: this.userDetails?.id
      }


      this.formulario_work.emit(formulario)
    }
  }
}
