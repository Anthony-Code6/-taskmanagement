import { Component, inject } from '@angular/core';
import { PostUpdateWorkComponent } from "../../../components/admin/home/post-update-work/post-update-work.component";
import { AreasService } from '../../../services/areas.service';
import { Work } from '../../../interfaces/work';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-work',
  standalone: true,
  imports: [PostUpdateWorkComponent],
  templateUrl: './create-work.component.html',
  styleUrl: './create-work.component.scss'
})
export class CreateWorkComponent {

  areaServices = inject(AreasService)
  router = inject(Router)

  formPostArea(datos: Work) {
    this.postArea(datos)
    this.router.navigate(['/administrador/home'])
  }

  async postArea(datos: Work) {
    const response = await this.areaServices.addWork(datos);
    if (response.error) {
      console.log(response.error);

      //this.message = 'Error: ' + response.error.message;
    } else {
      console.log(response.data);

      //this.message = '¡Registro agregado correctamente!';
      //this.newWork = { titulo: '', descripcion: '', uidUser: '' }; // Limpia el formulario
    }
  }

}
