import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { WorkAreaPostTaskComponent } from "../../../components/admin/work-area/work-area-post-task/work-area-post-task.component";
import { WorkAreaListTaskComponent } from "../../../components/admin/work-area/work-area-list-task/work-area-list-task.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkService } from '../../../services/work.service';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkAreaPostTaskComponent, WorkAreaListTaskComponent, RouterLink],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.scss'
})
export class WorkAreaComponent implements OnDestroy {

  tasks = signal<Task[]>([])
  idTask!: number

  private taskService = inject(TaskService)

  private router = inject(ActivatedRoute)
  private route = inject(Router)
  private workServices = inject(WorkService)

  constructor() {
    this.router.params.subscribe((parans) => {
      let idtarea = parans['id'] as number
      this.getWork(idtarea)
      this.idTask = idtarea
    })
  }

  ngOnDestroy(): void {
    this.tasks.set([])
  }

  async getWork(id: number) {
    try {
      const response = await this.workServices.gettWork(id);
      this.sellstTask(id)

    } catch (err) {
      this.route.navigate(['administrador/home'])
    }
  }

  async postTask(task: Task) {
    console.log(task);

    try {
      const response = this.taskService.addTask(task)
      console.log((await response).id);

      let task_push: Task = {
        id: (await response).id,
        task_id: (await response).task_id,
        tarea: (await response).tarea,
        estado: (await response).estado
      }

      this.tasks.update((parans) => [...parans, task_push])

    } catch (err) {
      console.log(err);
    }
  }

  async sellstTask(task_id: number) {
    try {
      const response = await this.taskService.sellstTask(task_id);
      this.tasks.set(response)
    } catch (err) {
      console.error(err);
    }
  }


  async deleteTask(event: Task) {
    try {
      const response = await this.taskService.dltTask(event.id as Number)
      const updateTask = this.tasks().filter((element) => element.id !== event.id)
      this.tasks.set(updateTask)
    } catch (err) {
      console.error(err);
    }
  }

  async updateTask(event: Task) {
    try {
      const response = await this.taskService.updTask(event.id as number, event)
      const updateTask = this.tasks().map((item) =>
        item.id == event.id
          ? { ...item, estado: event.estado }
          : item
      )
      this.tasks.set(updateTask)

    } catch (err) {
      console.error(err);
    }
  }

}
