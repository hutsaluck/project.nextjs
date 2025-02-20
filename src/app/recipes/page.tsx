import {MenuComponent} from "@/components/MenuComponent";
import {RecipesComponent} from "@/components/RecipesComponent";
import {IRecipe} from "@/models/IRecipe";
import {getAllRecipesWithPagination, getAllRecipesWithPaginationAndSearch, loadAuthRecipes} from "@/services/api.service";
import {SearchParams} from "next/dist/server/request/search-params";
import {PaginationComponent} from "@/components/PaginationComponent";
import {IBaseResponseModel} from "@/models/IBaseResponseModel";
import {SearchComponent} from "@/components/SearchComponent";

type Props = {
    searchParams: Promise<SearchParams>
};

const RecipesPage = async ({ searchParams }: Props) => {
    const {page, search} = await searchParams;
    const currentPage = Number(page) || 1;

    const searchQuery = Array.isArray(search) ? search[0] : search;
    let data: IBaseResponseModel = await getAllRecipesWithPagination(currentPage);
    if(searchQuery){
        data = await getAllRecipesWithPaginationAndSearch(currentPage, searchQuery);
    }
    const {recipes, total} = data

    return (
        <>
            <MenuComponent/>
            <SearchComponent type={'recipe'}/>
            <RecipesComponent recipes={recipes as IRecipe[]}/>
            <PaginationComponent totalPages={total} searchParams={{ page: currentPage || 1 }} />
        </>
    );
};

export default RecipesPage;