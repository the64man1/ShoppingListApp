import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    recipeId: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

    private initForm() {
        let recipeName = '';
        let recipeImgPath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipeById(this.recipeId);
            recipeName = recipe.name;
            recipeImgPath = recipe.imgPath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
                for (const ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name, Validators.required),
                            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                        })
                    )
                }
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imgPath': new FormControl(recipeImgPath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        )
    }

    onSubmit() {
        console.log(this.recipeForm.value)
        if (this.editMode) this.recipeService.udpateRecipe(this.recipeId, this.recipeForm.value);
        else this.recipeService.addRecipe(this.recipeForm.value);
        this.onCancel();
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onCancel() {
        this.router.navigate(['../', { relativeTo: this.route }]);
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.recipeId = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        )
    }
}