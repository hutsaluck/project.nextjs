'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {login, logout} from "@/services/api.service";
import {IUserWithTokens} from "@/models/IUserWithTokens";
import {IUserLogin} from "@/models/IUserLogin";

export const loginUser = async (data: IUserLogin): Promise<void> => {
    const user: IUserWithTokens = await login({...data, expiresInMins: 1})
    redirect(`/users/${user.id}`);
}

export const logoutUser = async () => {
    await logout()
    revalidatePath('/')
    redirect('/')
}
export const setSearchQuery = async (formData: FormData): Promise<void> => {
    const search = String(formData.get('search'))
    const type = String(formData.get('type'))

    if(type === 'users'){
        redirect(`/users?search=${search}`)
    } else {
        redirect(`/recipes?search=${search}`)
    }
}