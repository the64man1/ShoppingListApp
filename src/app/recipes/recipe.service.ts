import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesUpdated = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
                'Breakfast Tacos',
                'Cook potatos in microwave, fry potatos with butter and make them slightly brown, add salt and pepper, add eggs to potato, heat tortillas in microwave for 45 seconds.', 
                'https://media.istockphoto.com/id/989456062/photo/homemade-chorizo-breakfast-tacos.jpg?s=612x612&w=0&k=20&c=BqM3m9Go3aeSzwkOTVmIQm-CdQIHY0zn4Hr4bBgqNV8=', 
                [ new Ingredient('butter', 1), new Ingredient('egg', 3), new Ingredient('corn tortillas', 3), new Ingredient('red potatos', 2), new Ingredient('shredded cheddar cheese', 1)]
            ),
        new Recipe(
                'Beef Tataki', 
                'Grill beef and cut into thinslices, slice daikon and cumbers into thin slices, pour soy sauce into small individual servings', 
                'https://media.istockphoto.com/id/1340510309/photo/beef-tataki.jpg?s=612x612&w=0&k=20&c=DRDyD9La3x70nyRv1dCgjHdKYsUmKS7rr4w23B3cOKU=', 
                [ new Ingredient('beef cubes', 10), new Ingredient('cucumber', 2), new Ingredient('daikon', 1), new Ingredient('fresh ginger', 1), new Ingredient('garlic', 2), new Ingredient('lemon', 2)]
            )
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