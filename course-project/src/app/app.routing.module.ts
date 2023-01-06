import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/recipes',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		component: AuthComponent
	},
	{
		path: '**',
		redirectTo: ''
	}
]

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}