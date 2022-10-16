import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
	ingredientsChanged = new EventEmitter<Ingredient[]>();

	private   ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10),
	  ];
	getIngredients() {
		return this.ingredients.slice();
	}
	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}
	addIngredients(ingredients: Ingredient[]) {
		// ingredients.forEach(ingredient => {
		// 	this.ingredients.push(ingredient);
		// }); this works fine but max used spread operator ¬
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}
	// below there's a solution to not add duplicate ingredients
	// addIngredient(ingredient: Ingredient, publishChanges = true) {
	// 	const index = this.ingredients.findIndex(ing => ing.name === ingredient.name);
	// 	if (index === -1) { 
	// 	  this.ingredients.push(ingredient); 
	// 	} else {  
	// 	  this.ingredients[index].amount += ingredient.amount;  
	// 	}
	// 	if (publishChanges) {  
	// 	  this.ingredientsChanged.emit(this.ingredients.slice());  
	// 	}
	//   }
	//   addIngredients(ingredients: Ingredient[]) {
	// 	ingredients.forEach(ing => this.addIngredient(ing, false));  
	// 	this.ingredientsChanged.emit(this.ingredients.slice());
	//   }
}