import { FC } from "react";

interface IProps {
    totalPages: number;
    searchParams: { page: number };
}

export const PaginationComponent: FC<IProps> = ({ totalPages, searchParams }) => {
    const currentPage = Number(searchParams.page) || 1;

    const createPageLink = (page: number) => {
        const params = new URLSearchParams(Object.entries(searchParams).map(([key, value]) => [key, String(value)]));
        params.set("page", page.toString());
        return `?${params.toString()}`;
    };

    const paginationItems = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
            page === currentPage ? (
                <span key={page} className="text-gray-500 relative px-2">{page}</span>
            ) : (
                <a key={page} href={createPageLink(page)} className="text-gray-500 hover:text-gray-900 relative px-2">
                    {page}
                </a>
            )
        );
    }

    return (
        <div className={`grid ${totalPages > 10 ? "grid-cols-[repeat(30,20px)]" : "grid-flow-col"} gap-5 justify-center items-center w-1/5 mx-auto my-10 text-gray-500`}>
            {currentPage > 1 && (
                <a key="prev" href={createPageLink(currentPage - 1)} className="text-gray-500 hover:text-gray-900 relative px-2">
                    &#10094;
                </a>
            )}
            {paginationItems.map(item => item)}
            {currentPage < totalPages && (
                <a key="next" href={createPageLink(currentPage + 1)} className="text-gray-500 hover:text-gray-900 relative px-2">
                    &#10095;
                </a>
            )}
        </div>
    );
};