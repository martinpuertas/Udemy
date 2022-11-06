import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeNoSelectedComponent } from "./recipes/recipe-no-selected/recipe-no-selected.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/recipes',
		pathMatch: 'full'
	},
	{
		path: 'recipes',
		component: RecipesComponent,
		children: [
			{
				path: '',
				component: RecipeNoSelectedComponent
			},
			{
				path: 'new',
				component: RecipeEditComponent
			},
			{
				path: ':id',
				component: RecipeDetailComponent
			},
			{
				path: ':id/edit',
				component: RecipeEditComponent
			}
		]
	},
	{
		path: 'shopping-list',
		component: ShoppingListComponent
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
export class AppRoutingModule {

}