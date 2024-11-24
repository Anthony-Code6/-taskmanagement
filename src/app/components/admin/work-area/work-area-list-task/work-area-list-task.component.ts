import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { Task } from '../../../../interfaces/task';

@Component({
  selector: 'app-work-area-list-task',
  standalone: true,
  imports: [],
  templateUrl: './work-area-list-task.component.html',
  styleUrl: './work-area-list-task.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WorkAreaListTaskComponent {
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

}
