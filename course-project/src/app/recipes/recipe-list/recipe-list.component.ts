import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (newRecipes: Recipe[]) => {
        this.recipes = newRecipes;
      }
    )
    this.recipes = this.recipeService.getRecipes()
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
