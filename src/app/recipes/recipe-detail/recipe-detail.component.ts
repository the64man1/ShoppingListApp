import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  onAddToList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.recipeId);
      }
    )
  }
}
