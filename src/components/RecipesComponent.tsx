import {IRecipe} from "@/models/IRecipe";
import {RecipeComponent} from "@/components/RecipeComponent";

interface RecipesComponentProps {
    recipes: IRecipe[]
}

export const RecipesComponent = ({recipes}: RecipesComponentProps) => {

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-center items-start mx-2 sm:mx-5">
                {recipes.map((recipe: IRecipe) => (<RecipeComponent key={recipe.id} recipe={recipe} />))}
            </div>
        </>
    );
};