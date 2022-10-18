import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
    // params es un observable por eso nos podemos suscribir.
    // al suscribirnos el codigo no se ejecuta, solo se registra la suscripcion
    // y si el observable se dispara se ejecutará el codigo del subscribe
    // es importante desuscribir los observables en OnDestroy
    // aunque en el caso de subscribe de routes ya se encargará angular si no los añadimos
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
