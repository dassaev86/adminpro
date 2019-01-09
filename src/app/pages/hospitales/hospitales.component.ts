import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
// declare var Swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalHospitales: number;
  cargando = true;
  imgSeleccionada: string;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) {
      this.cargarHospitales();
      this._modalUploadService.notificacion
              .subscribe(() => this.cargarHospitales());
  }

  ngOnInit() {
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
    .subscribe((data: any) => {
      this.hospitales = data.hospitales;
      this.totalHospitales = data.total;
      this.cargando = false;
      console.log(this.hospitales);
    });
  }

  nuevoHospital() {

    swal({
      title: 'Crear Nuevo Hospital',
      text: 'Ingresa el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then((value) => {
      if (value === '') {
        swal('Debes ingresar un nombre', 'Nombre no valido', 'warning');
             }
             if (!value) {
               return;
             }
             const hospital = new Hospital(
               value
             );

             this._hospitalService.agregarHospital(hospital)
                   .subscribe((data: any) => {
                     console.log(data);
                    swal('Hospital Registrado con Exito', data.hospital.nombre + ' agregado', 'success');
                    this.cargarHospitales();
                   });
    });

  }

  guardarHospital(hospital, nombreActualizado) {
    this._hospitalService.actualizarHospital(hospital, nombreActualizado)
            .subscribe();
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: '¿Estas Seguro?',
      text: 'Estas a punto de borrar ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log(borrar);

      if (borrar) {
          this._hospitalService.eliminarHospital(hospital)
                    .subscribe(borrado => {
                      console.log(borrado);
                      swal('Usuario borrado', hospital.nombre + ' ha sido borrado', 'success');
                      this.cargarHospitales();
                    });
      }
    });

  }

  buscarHospital(termino: string) {
    if (termino === '' ) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospitales(termino)
          .subscribe((data: any) => {
            console.log(data);
            this.hospitales = data.hospitales;
          });
  }

  mostrarModal(id: string, evento) {
    this.imgSeleccionada = evento.srcElement.currentSrc.substring(37);
    console.log(this.imgSeleccionada);

      this._modalUploadService.mostrarModal('hospitales', id, this.imgSeleccionada);
  }
}
