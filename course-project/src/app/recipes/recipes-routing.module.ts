import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeNoSelectedComponent } from "./recipe-no-selected/recipe-no-selected.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
	{
		path: '',
		component: RecipesComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: RecipeNoSelectedComponent,
				resolve: [RecipesResolverService]
			},
			{
				path: 'new',
				component: RecipeEditComponent
			},
			{
				path: ':id',
				component: RecipeDetailComponent,
				resolve: [RecipesResolverService]
			},
			{
				path: ':id/edit',
				component: RecipeEditComponent,
				resolve: [RecipesResolverService]
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class RecipesRoutingModule {}