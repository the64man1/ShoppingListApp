import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesUpdated = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('t', 't', '', [ new Ingredient('meat', 1), new Ingredient('egg', 2)]),
        new Recipe('s', 's', '', [ new Ingredient('potato', 3), new Ingredient('cheese', 6)])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesUpdated.next(this.recipes.slice());
    }

    udpateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesUpdated.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesUpdated.next(this.recipes.slice());
    }
}