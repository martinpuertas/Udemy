import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // version con snapshot
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    
    // version con subscribe que actualiza el server si los params de la url cambian
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // )

    // ambos ejemplos de mas arriba se comentaron para dar lugar al ServerResolver
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data.server;
      }
    )
  }
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
