import {IRecipe} from "@/models/IRecipe";
import {IUser} from "@/models/IUser";
import Link from "next/link";
import React from "react";

interface RecipeProps {
    recipe: IRecipe | null,
    recipeUser: IUser | null
}

const RecipePageComponent: React.FC<RecipeProps> = ({recipe, recipeUser}) => {
    return (
        <div>
            {recipe && (
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h1>

                    {recipe.image && (
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-180 object-cover rounded-2xl mb-6"
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-gray-600">
                                <span className="font-semibold">ID:</span> {recipe.id}
                            </p>
                            <Link href={`/users/${recipe.userId}`} className="text-gray-600">
                                <span className="font-semibold">Автор:</span> {recipeUser?.firstName} {recipeUser?.lastName}
                            </Link>
                            <p className="text-gray-600">
                                <span className="font-semibold">Кухня:</span> {recipe.cuisine}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Складність:</span> {recipe.difficulty}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Порції:</span> {recipe.servings}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">
                                <span className="font-semibold">Час приготування:</span>{' '}
                                {recipe.prepTimeMinutes} хв (підготовка) + {recipe.cookTimeMinutes} хв (готування)
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Калорій на порцію:</span> {recipe.caloriesPerServing}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Рейтинг:</span> {recipe.rating}{' '}
                                <span className="text-sm text-gray-500">({recipe.reviewCount} відгуків)</span>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Тип страви:</span> {recipe.mealType.join(', ')}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Теги:</span> {recipe.tags.join(', ')}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Інгредієнти</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Інструкції</h2>
                        <ol className="list-decimal list-inside text-gray-700">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="mb-2">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipePageComponent;
