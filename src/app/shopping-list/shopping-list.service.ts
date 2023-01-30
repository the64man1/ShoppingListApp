import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsUpdated = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('test1', 5),
        new Ingredient('test2', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsUpdated.emit(this.ingredients.slice());
    }
}