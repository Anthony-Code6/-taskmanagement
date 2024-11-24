import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { WorkService } from '../../../services/work.service';
import { Work } from '../../../interfaces/work';
import { ActivatedRoute, Router } from '@angular/router';
import { PostUpdateWorkComponent } from '../../../components/admin/home/post-update-work/post-update-work.component';

@Component({
  selector: 'app-create-update-work',
  standalone: true,
  imports: [PostUpdateWorkComponent],
  templateUrl: './create-update-work.component.html',
  styleUrl: './create-update-work.component.scss'
})
export class CreateUpdateWorkComponent {

  areaServices = inject(WorkService)
  routerActive = inject(ActivatedRoute)
  router = inject(Router)

  editWork !: Work

  constructor() {

    this.routerActive.params.subscribe(paran => {
      if (paran['id'] > 0) {
        this.getWork(paran['id'])
      }
    })
  }

  formPostArea(datos: Work) {

    if (datos.id as number > 0) {
      this.updateWork(datos)
    } else {
      this.postArea(datos)
    }

    setTimeout(() => {
      this.router.navigate(['/administrador/home'])
    }, 1000)
  }

  async getWork(id: number) {
    try {
      const response = await this.areaServices.gettWork(id);
      this.editWork = response
    } catch (err) {
      this.router.navigate(['administrador/home'])
    }
  }

  async postArea(datos: Work) {
    try{
      const response = await this.areaServices.addWork(datos);
      // Mensaje
    }catch(err){
      console.log(err);
    }
  }

  async updateWork(work: Work) {
    try {
      const id = work.id as number
      const updatedWork = await this.areaServices.updWork(id, {
        titulo: work.titulo,
        descripcion: work.descripcion,
        uidUser: work.uidUser,
      });

    } catch (err) {
      console.log(err);
    }
  }
}
