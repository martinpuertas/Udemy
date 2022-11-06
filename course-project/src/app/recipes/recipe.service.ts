import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();
	
	private recipes: Recipe[] = [
		new Recipe(
			'Chicken Soup',
			'A cold fighter',
			'https://amindfullmom.com/wp-content/uploads/2016/09/Chicken-Soup.jpg',
			[
				new Ingredient('Chicken in pieces', 1),
				new Ingredient('Onions', 2),
				new Ingredient('Carrots', 3),
				new Ingredient('Potatoes', 1),
			]),
		new Recipe(
			'Quiche Lorraine',
			'Your Picnic partner',
			'https://natashaskitchen.com/wp-content/uploads/2019/11/Classic-Quiche-Lorraine-Recipe-Beautiful-flaky-pastry-crust-is-paired-with-a-delicious-savory-egg-custard.-Perfect-for-breakfast-or-brunch.-1-4.jpg',
			[
				new Ingredient('Pie crust', 1),
				new Ingredient('Bacon strips', 2),
				new Ingredient('Eggs', 6),
				new Ingredient('Milk cream', 500),
			])
	  ];
	constructor(private shoppingListService: ShoppingListService) {}

	getRecipes() {
		return this.recipes.slice();
	}
	getRecipe(index: number) {
		return this.recipes[index];
	}
	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}
}