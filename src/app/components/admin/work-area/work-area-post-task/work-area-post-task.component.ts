import { AfterViewInit, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../../interfaces/task';

@Component({
  selector: 'app-work-area-post-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './work-area-post-task.component.html',
  styleUrl: './work-area-post-task.component.scss'
})
export class WorkAreaPostTaskComponent implements AfterViewInit {

  form_task = output<Task>()
  idTask = input<number>(0)

  formulario!: FormGroup
  forn = inject(FormBuilder)

  constructor() {
    this.formulario = this.forn.group({
      tarea: this.forn.control('', [Validators.required])
    })
    effect(() => {
      let id = this.idTask()
    })

  }

  ngAfterViewInit(): void {
    document.getElementById('tarea')?.focus()
  }

  submitTask() {
    if (this.formulario.valid) {
      let tarea: Task = {
        task_id: this.idTask(),
        tarea: this.formulario.controls['tarea'].value,
        estado: false
      }

      this.form_task.emit(tarea)

      this.formulario.reset()
    }
  }
}
