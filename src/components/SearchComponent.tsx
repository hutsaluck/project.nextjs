'use client'

import {SearchIcon} from "@/icons/SearchIcon";
import {setSearchQuery} from "@/server-actions/serverActions";
import React from "react";

type Props = {
    type: string
}
export const SearchComponent = ({type}: Props) => {

    return (
        <div className="flex justify-center items-center w-full mt-4">
            <div className="relative w-80">
                <SearchIcon/>
                <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value, type)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
            </div>
        </div>
    );
};