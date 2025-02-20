'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getRecipeBySearchQuery, getUserBySearchQuery, login, logout} from "@/services/api.service";
import {IUserWithTokens} from "@/models/IUserWithTokens";
import {IUserLogin} from "@/models/IUserLogin";

export const loginUser = async (data: IUserLogin) => {
    const user: IUserWithTokens = await login({...data, expiresInMins: 1})
    // console.log(user);
    // revalidatePath('/')
    // redirect(`/users/${user.id}`);
    redirect(`/users`);
}

export const logoutUser = async () => {
    await logout()
    revalidatePath('/')
    redirect('/')
}
export const setSearchQuery = async (searchQuery: string, type: string) => {
    if(type === 'user'){
        return await getUserBySearchQuery(searchQuery)
    } else {
        return await getRecipeBySearchQuery(searchQuery)
    }
}