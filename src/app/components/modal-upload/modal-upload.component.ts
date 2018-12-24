import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File = null;
  imagenTemp: any;

  constructor( public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService,
              public _usuarioService: UsuarioService) {}

  ngOnInit() {
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

     if (archivo.type.indexOf('image') < 0) {
       swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
       this.imagenSubir = null;
     }

     this.imagenSubir = archivo;

     const reader = new FileReader();
     const urlImagenTemp = reader.readAsDataURL(archivo);

     reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
              .then( resp => {
                  console.log(resp);
                  this._modalUploadService.notificacion.emit( resp );
                  this.cerrarModal();
              })
              .catch( err => {
                console.error('Error en la carga' , err);
              });
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

}
