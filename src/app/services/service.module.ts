import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService, SettingsService, UsuarioService, SubirArchivoService, HospitalService} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { MedicoService } from './medico/medico.service';
import { AdminGuard } from './guards/admin.guard';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService,
    HospitalService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService,
    AdminGuard
  ],
  declarations: []
})
export class ServiceModule { }
