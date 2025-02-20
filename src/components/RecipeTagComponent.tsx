import {redirect} from "next/navigation";

interface RecipeTagComponentProps {
    tag: string,
    index: number
}

export const RecipeTagComponent = ({tag, index}: RecipeTagComponentProps) => {
    return (
        <span
            onClick={() => {
                if (!location.pathname.includes('recipes')) {
                    redirect(`/recipes/tag/${tag}`)
                }
            }}
            className="bg-gray-400 rounded-2xl py-1 px-3 text-white text-center cursor-pointer transition-shadow duration-500 hover:shadow-lg"
            key={index}>
            #{tag}
        </span>
    )
};