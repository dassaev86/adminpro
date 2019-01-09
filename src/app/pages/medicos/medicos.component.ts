import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  cargando = false;
  medicos: Medico[] = [];

  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
          .subscribe(medicos => {
            this.medicos = medicos;
          });
  }

  editarMedico(medico: Medico) {

  }

  borrarMedico(medico: Medico) {
      this._medicoService.eliminarMedico(medico._id)
              .subscribe((data: any) => {
                console.log(data);
                swal('Medico eliminado con exito', data.medico.nombre + 'fue borrado', 'success');
                this.cargarMedicos();
              });
  }

  buscarMedico(termino: string) {
      if (termino.length < 1) {
        this.cargarMedicos();
        return;
      }

      this._medicoService.buscarMedicos(termino)
          .subscribe((data: any) => this.medicos = data.medicos);
  }

}
