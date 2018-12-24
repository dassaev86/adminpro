import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto = 'ocultar';
  public imagen: string;
  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('funciona');
  }

  ocultarModal() {
    this.oculto = 'ocultar';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string, imagen: string) {
    this.oculto = '';
    this.imagen = imagen;
    this.id = id;
    this.tipo = tipo;
  }
}
