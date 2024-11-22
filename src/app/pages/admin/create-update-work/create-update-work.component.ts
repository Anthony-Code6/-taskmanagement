import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
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

  areaServices = inject(AreasService)
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
    const response = await this.areaServices.gettWork(id);
    if (response.error) {
      // Mensaje de Error
      //response.error.message;
    } else if (response.work) {
      this.editWork = response.work
    }
  }

  async postArea(datos: Work) {
    const response = await this.areaServices.addWork(datos);
    if (response.error) {
      // console.log(response.error);

      //this.message = 'Error: ' + response.error.message;
    } else {
      // console.log(response.data);

      //this.toask.success('¡Registro agregado correctamente!','SUCCESS',2000)
      //this.newWork = { titulo: '', descripcion: '', uidUser: '' }; // Limpia el formulario
    }
  }

  async updateWork(work: Work): Promise<void> {
    const updatedWork = await this.areaServices.updWork(work.id, {
      titulo: work.titulo,
      descripcion: work.descripcion,
      uidUser: work.uidUser,
    });

    if (updatedWork) {
      // console.log('Registro actualizado con éxito:', updatedWork);
      // alert('Registro actualizado');
    }
  }
}
