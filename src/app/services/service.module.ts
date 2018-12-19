import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService, SettingsService, UsuarioService, SubirArchivoService} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';



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
    LoginGuardGuard,
    SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule { }
