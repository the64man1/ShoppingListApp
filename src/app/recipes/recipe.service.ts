import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeChosen = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('t', 't', '', [ new Ingredient('meat', 1), new Ingredient('egg', 2)]),
        new Recipe('s', 's', '', [ new Ingredient('potato', 3), new Ingredient('cheese', 6)])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}