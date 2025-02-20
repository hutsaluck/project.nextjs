import {IRecipe} from "@/models/IRecipe";
import Link from "next/link";
import {RecipeTagComponent} from "@/components/RecipeTagComponent";

interface RecipeComponentProps {
    recipe: IRecipe
}

export const RecipeComponent = ({recipe}: RecipeComponentProps) => {
    return (
        <div
            className="overflow-hidden my-10 border border-gray-300 rounded-2xl grid justify-center items-center cursor-pointer transition-shadow duration-500 hover:shadow-lg group">
            <Link href={`/recipes/${recipe.id}`}>
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-110"
                />
            </Link>
            <div className="p-4">
                <Link href={`/recipes/${recipe.id}`}>

                    <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                </Link>
                <h4 className="text-base font-semibold text-gray-800 my-2">Tags:</h4>
                <p className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
                    {recipe.tags.map((tag, index) => (
                        <RecipeTagComponent key={index} tag={tag} index={index} />
                    ))}
                </p>
            </div>
        </div>
    );
};