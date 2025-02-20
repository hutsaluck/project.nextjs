import {MenuComponent} from "@/components/MenuComponent";
import {UsersComponent} from "@/components/UsersComponent";
import {getAllUsersWithPagination, getAllUsersWithPaginationAndSearch} from "@/services/api.service";
import {SearchParams} from "next/dist/server/request/search-params";
import {PaginationComponent} from "@/components/PaginationComponent";
import {IBaseResponseModel} from "@/models/IBaseResponseModel";
import {IUser} from "@/models/IUser";
import {SearchComponent} from "@/components/SearchComponent";

type Props = {
    searchParams: Promise<SearchParams>
};

const UsersPage = async ({ searchParams }: Props) => {
    const {page, search} = await searchParams;
    const currentPage = Number(page) || 1;

    let data: IBaseResponseModel = await getAllUsersWithPagination(currentPage);
    if(search){
        const searchQuery = Array.isArray(search) ? search[0] : search;
        if(searchQuery){
            data = await getAllUsersWithPaginationAndSearch(currentPage, searchQuery);
        }
    }

    const {users, total} = data

    return (
        <>
            <MenuComponent/>
            <SearchComponent type={'users'}/>
            <UsersComponent users={users as IUser[]}/>
            <PaginationComponent totalPages={total} searchParams={{ page: currentPage || 1 }} />
        </>
    );
};

export default UsersPage;