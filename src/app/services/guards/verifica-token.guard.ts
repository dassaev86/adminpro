import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

   constructor(public _usuarioService: UsuarioService,
              public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('Token Guard');
    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }



    return this.verificaRenueva(payload.exp);
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((res, rej) => {
        const tokenExp = new Date(fechaExp * 1000);
        const ahora = new Date();

        ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000) );

        if (tokenExp.getTime() > ahora.getTime()) {
          res(true);
        } else {
          this._usuarioService.renuevaToken()
              .subscribe(() => {
                res(true);
              }, () => {
                this.router.navigate(['/login']);
                rej(false);
              });
        }

        res(true);
    });
  }
}
