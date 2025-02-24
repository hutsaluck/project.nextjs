import {SearchIcon} from "@/icons/SearchIcon";
import {setSearchQuery} from "@/server-actions/serverActions";
import React from "react";

type Props = {
    type: string;
};

export const SearchComponent = ({ type }: Props) => {
    return (
        <div className="flex justify-center items-center w-full mt-4">
            <div className="relative w-80">
                <form action={setSearchQuery} className="grid grid-cols-[1fr,70px] gap-6 items-center justify-center">
                    <div className="relative my-0">
                        <SearchIcon className="absolute left-0.5 top-2.5 text-gray-400"/>
                        <input
                            name="search"
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                    <input type="hidden" value={type} name="type"/>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};
