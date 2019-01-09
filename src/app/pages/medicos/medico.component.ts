import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico = new Medico('', '', '', '', '');
  hospital = new Hospital('');
  imgSeleccionada: string;

  constructor(public _hospitalService: HospitalService,
              public _medicoService: MedicoService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public _modalService: ModalUploadService) {
                activatedRoute.params.subscribe( params => {
                  const id = params['id'];

                  if (id !== 'nuevo') {
                      this.obtenerMedico(id);
                  }
                });
              }

  ngOnInit() {
      this._hospitalService.cargarHospitales()
          .subscribe((data: any) => {
            this.hospitales = data.hospitales;
          });

          this._modalService.notificacion
              .subscribe(resp => {
                this.medico.img = resp.medico.img;
              });

  }

  guardarMedico(forma: NgForm) {
    console.log(forma.valid);
    console.log(forma.value);

    if (forma.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
          .subscribe(medico => {
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
          });
  }

  cambioHospital(id: string) {
     this._hospitalService.obtenerHospital(id)
           .subscribe(hospital => {
             this.hospital = hospital;
           });
  }

  obtenerMedico(id: string) {
    this._medicoService.cargarMedico(id)
        .subscribe(medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital(this.medico.hospital);
        });
  }

  cambiarImagen(evento) {
    this.imgSeleccionada = evento.srcElement.currentSrc.substring(34);
    console.log(this.imgSeleccionada);
    this._modalService.mostrarModal('medicos', this.medico._id, this.imgSeleccionada);
  }

}
