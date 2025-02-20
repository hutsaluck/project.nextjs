import {FC} from "react";
import {Metadata} from "next";
import {IRecipe} from "@/models/IRecipe";
import {MenuComponent} from "@/components/MenuComponent";
import {getRecipeById, getUserById} from "@/services/api.service";
import {IUser} from "@/models/IUser";
import RecipePageComponent from "@/components/RecipePageComponent";

type Props = {
    params: Promise<{id: string}>,
}

export const generateMetadata = async ({params}:Props): Promise<Metadata> => {
    const {id} = await params

    return {
        title: `Recipe Page ${id}`
    }
}
const RecipePage:FC<Props> = async ({params}) => {
    const {id} = await params
    const recipe: IRecipe = await getRecipeById(Number(id));
    const recipeUser: IUser = await getUserById(recipe.userId);

    return (
        <div>
            <MenuComponent/>
            {recipe && (
                <RecipePageComponent recipe={recipe} recipeUser={recipeUser}/>
            )}
        </div>
    );
};

export default RecipePage;