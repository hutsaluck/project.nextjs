import Link from "next/link";

interface RecipeTagComponentProps {
    tag: string,
    index: number
}

export const RecipeTagComponent = ({tag, index}: RecipeTagComponentProps) => {
    return (
        <Link href={`/recipes/tag/${tag}`}
            className="bg-gray-400 rounded-2xl py-1 px-3 text-white text-center cursor-pointer transition-shadow duration-500 hover:shadow-lg"
            key={index}>
            #{tag}
        </Link>
    )
};