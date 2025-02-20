import {MenuComponent} from "@/components/MenuComponent";
import {RecipesComponent} from "@/components/RecipesComponent";
import {IRecipe} from "@/models/IRecipe";
import {getRecipesWithPaginationByTag} from "@/services/api.service";
import {SearchParams} from "next/dist/server/request/search-params";
import {PaginationComponent} from "@/components/PaginationComponent";
import {IBaseResponseModel} from "@/models/IBaseResponseModel";

type Props = {
    params: Promise<{tag: string}>,
    searchParams: Promise<SearchParams>
};

const RecipesTagPage = async ({ params, searchParams }: Props) => {
    const {tag} = await params
    const {page} = await searchParams;
    const currentPage = Number(page) || 1;

    const {recipes, total}: IBaseResponseModel = await getRecipesWithPaginationByTag(tag, currentPage);

    return (
        <>
            <MenuComponent/>
            <RecipesComponent recipes={recipes as IRecipe[]}/>
            <PaginationComponent totalPages={total} searchParams={{ page: currentPage || 1 }} />
        </>
    );
};

export default RecipesTagPage;