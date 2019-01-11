import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient,
              public router: Router) {

    this.activatedRoute.params
        .subscribe(params => {
          const termino = params['termino'];
          this.buscar(termino);
        });
   }

  ngOnInit() {
  }


  buscar(termino: string) {
    const url = `${URL_SERVICIOS}/search/todo/${termino}`;

    this.http.get(url)
        .subscribe((resp: any) => {
          this.usuarios = resp.usuarios;
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          console.log(this.medicos);
        });
  }

  editarMedico(medico: Medico) {
    this.router.navigate(['/medico', medico._id]);
  }

}
