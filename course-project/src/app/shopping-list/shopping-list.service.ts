import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<Number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10),
	  ];
	getIngredients() {
		return this.ingredients.slice();
	}
	getIngredient(index: number) {
		return this.ingredients[index];
	}
	// addIngredient(ingredient: Ingredient) {
	// 	this.ingredients.push(ingredient);
	// 	this.ingredientsChanged.emit(this.ingredients.slice());
	// }
	addIngredients(ingredients: Ingredient[]) {
		ingredients.forEach(ingredientToAdd => {
			const index = this.ingredients.findIndex(ing => ing.name === ingredientToAdd.name);
			if (index === -1) {
				this.ingredients.push(ingredientToAdd);
			} else {
				this.ingredients[index].amount += ingredientToAdd.amount;
			}
		});
		this.ingredientsChanged.next(this.ingredients.slice());
		// this ^ works fine but max used spread operator > this.ingredients.push(...ingredients);
		// though you can't check for duplicates pushing the array all at once
	}
	updateIngredients(index:number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
		this.ingredientsChanged.next(this.ingredients.slice());
	}
	deleteIngredient(index:number) {
		this.ingredients.splice(index, 1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
	// below it's the original solution to avoid duplicates posted by Jost
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