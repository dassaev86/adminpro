import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
        .pipe(map( (resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        }));
  }

  buscarMedicos(termino: string) {
    const url = `${URL_SERVICIOS}/search/coleccion/medicos/${termino}`;
    return this.http.get(url);
  }

  eliminarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;

    return this.http.delete(url);
  }

  guardarMedico(medico: Medico) {
    if (medico._id) {
      const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuarioService.token}`;

      return this.http.put(url, medico)
            .pipe(map((resp: any) => {
              swal('Medico actualizado con exito', medico.nombre, 'success');
              return resp.medico;
            }));

    } else {
      // Creando
      const url = `${URL_SERVICIOS}/medico/?token=${this._usuarioService.token}`;

     return this.http.post(url, medico)
          .pipe(map((resp: any) => {
              swal('Medico creado con exito', medico.nombre, 'success');
              return resp.medico;
          }));
    }
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.medico));
  }
}


