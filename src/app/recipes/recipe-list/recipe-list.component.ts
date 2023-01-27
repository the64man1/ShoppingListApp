import { outputAst } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('t', 't', ''),
    new Recipe('s', 's', '')
  ];
  @Output() recipeChosen = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.recipeChosen.emit(recipe);
  }

  constructor() {}
  ngOnInit() {
  }
}
