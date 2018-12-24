import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
// import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  imgSeleccionada: string;


  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
          .subscribe((borrado: any) => {
            this.totalRegistros = borrado.total;
            this.usuarios = borrado.usuarios;
            this.cargando = false;
          });
  }

  cambiarDesde(valor: number) {
    this.desde = this.desde + valor;
      if (this.desde <= 0) {
        this.desde = 0;
      }

      if (this.desde >= this.totalRegistros - 1) {
        this.desde = this.totalRegistros - 1;
      }

      this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length < 1) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
      this._usuarioService.buscarUsuarios(termino)
              .subscribe((borrado: any) => {
                this.usuarios = borrado.usuarios;
                this.cargando = false;
              });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No es posible borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estas Seguro?',
      text: 'Estas a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log(borrar);

      if (borrar) {
          this._usuarioService.eliminarUsuario(usuario._id)
                    .subscribe(borrado => {
                      console.log(borrado);
                      this.desde = 0;
                      this.cargarUsuarios();
                      swal('Usuario borrado', 'El usuario ' + usuario.nombre + ' ha sido borrado', 'success');
                    });
      }
    });

  }

  guardarUsuario(usuario: Usuario) {
      this._usuarioService.actualizarUsuario(usuario)
              .subscribe();
  }

  mostrarModal(id: string, evento) {
    this.imgSeleccionada = evento.srcElement.currentSrc.substring(35);

      this._modalUploadService.mostrarModal('usuarios', id, this.imgSeleccionada);
  }

}
