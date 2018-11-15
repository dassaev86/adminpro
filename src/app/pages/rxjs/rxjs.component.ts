import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription} from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  susbcription: Subscription;

  constructor() {

  this.susbcription = this.regresaObservable().pipe(
     retry(3)
  )
  .subscribe(
    numero =>  console.log('Subs', numero),
    error => console.error('Error', error),
    () => console.log('El Observador terminó')

 );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.susbcription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

   return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

       /* if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */

        /* if (contador === 2) {
          // clearInterval(intervalo);
          observer.error('Un número 2');
        } */
      }, 1000);

    }).pipe(
      map( resp => resp.valor),
     filter((valor, index) => {
       if ((valor % 2) === 1) {
          return true;
       } else {
         return false;
       }
     })
    );

  }

}
