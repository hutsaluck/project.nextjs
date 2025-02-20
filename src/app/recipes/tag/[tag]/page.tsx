import {MenuComponent} from "@/components/MenuComponent";
import {RecipesComponent} from "@/components/RecipesComponent";
import {IRecipe} from "@/models/IRecipe";
import {getRecipesWithPaginationByTag} from "@/services/api.service";
import {SearchParams} from "next/dist/server/request/search-params";
import {PaginationComponent} from "@/components/PaginationComponent";
import {IBaseResponseModel} from "@/models/IBaseResponseModel";
import {Metadata} from "next";

type Props = {
    params: Promise<{tag: string}>,
    searchParams: Promise<SearchParams>
};

export const generateMetadata = async ({params}:Props): Promise<Metadata> => {
    const {tag} = await params;
    return {
        title: `Recipe Tag ${tag}`,
    };
}

const RecipesTagPage = async ({ params, searchParams }: Props) => {
    const {tag} = await params;
    const {page} = await searchParams;
    const currentPage = Number(page) || 1;

    const {recipes, total}: IBaseResponseModel = await getRecipesWithPaginationByTag(tag, currentPage);

    const limit = 30
    const totalPages = Math.ceil(total / limit)

    return (
        <>
            <MenuComponent/>
            <RecipesComponent recipes={recipes as IRecipe[]}/>
            <PaginationComponent totalPages={totalPages} searchParams={{ page: currentPage || 1 }} />
        </>
    );
};

export default RecipesTagPage;
