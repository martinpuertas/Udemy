import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Server } from "./server.model";

@Injectable() // OJO recordar el decorator si inyectamos un service en otro service como este caso!!
export class ServerResolver implements Resolve<Server> {
	// inyectamos el serversService para poder obtener los servers
	constructor(private serversService: ServersService) {}

	// el resolver se encarga de obtener los datos ANTES de cargar el componente,
	// cosa que tiene valor sobre todo si esa carga es asincrona y puede tardar.
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
		return this.serversService.getServer(+route.params.id);	
	}
}