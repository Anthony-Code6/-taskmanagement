import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { Task } from '../../../../interfaces/task';

@Component({
  selector: 'app-work-area-list-task',
  standalone: true,
  imports: [],
  templateUrl: './work-area-list-task.component.html',
  styleUrl: './work-area-list-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkAreaListTaskComponent {

  deleteTask = output<Task>()
  updateTask = output<Task>()

  task_complete = signal<boolean>(false)

  task = input.required<Task>()

  constructor() {
    effect(() => {
      const data = this.task()
      data.estado ? this.task_complete.set(true) : this.task_complete.set(false)

    }, {
      allowSignalWrites: true
    }
    )
  }

  update() {
    let taskUpdate: Task = {
      id: this.task().id,
      task_id: this.task().task_id,
      tarea: this.task().tarea,
      estado: this.task().estado ? false : true
    }
    this.updateTask.emit(taskUpdate)
  }

  delete() {
    this.deleteTask.emit(this.task())
  }

}
