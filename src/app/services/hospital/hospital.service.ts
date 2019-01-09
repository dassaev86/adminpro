import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
// import swal from 'sweetalert';
declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {
                this.token = this._usuarioService.token;
                this.usuario = this._usuarioService.usuario;
               }

  cargarHospitales() {

    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital, nombreActualizado: string) {
    const id = hospital._id;
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;
    hospital.nombre = nombreActualizado;

    return this.http.put(url, hospital)
              .pipe(map((resp: any) => {
                swal('Hospital actualizado', hospital.nombre, 'success');
              }));
  }

  eliminarHospital(hospital: Hospital) {
    const id = hospital._id;
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;

    return this.http.delete(url);

  }

  agregarHospital(hospital: Hospital) {
      const url = `${URL_SERVICIOS}/hospital/?token=${this._usuarioService.token}`;
      return this.http.post(url, hospital);
  }

  buscarHospitales(termino: string) {
    const url = `${URL_SERVICIOS}/search/coleccion/hospitales/${termino}`;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
          .pipe(map((resp: any) => {
                return resp.hospital;
          }));
  }



}
