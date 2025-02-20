'use client'

import {HomeComponent} from "@/components/HomeComponent";
import {MenuComponent} from "@/components/MenuComponent";
import {retriveLocalStorage} from "@/services/helpers";
import {IUserWithTokens} from "@/models/IUserWithTokens";

export default function Home() {
    const userWithTokens = retriveLocalStorage<IUserWithTokens>("user");
    return (
        <>
            <MenuComponent/>
            <HomeComponent user={userWithTokens}/>
        </>
    );
}