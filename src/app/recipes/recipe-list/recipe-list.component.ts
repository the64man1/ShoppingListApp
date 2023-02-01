import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  onStartNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.sub = this.recipeService.recipesUpdated.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
