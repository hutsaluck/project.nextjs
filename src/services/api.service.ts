'use server'

import axios from "axios";
import {IUserWithTokens} from "@/models/IUserWithTokens";
import {getServerStorage, removeServerStorage, setServerStorage} from "@/services/helpers";
import {IRecipe} from "@/models/IRecipe";
import {IBaseResponseModel} from "@/models/IBaseResponseModel";
import {IUser} from "@/models/IUser";
import {ITokenPair} from "@/models/ITokenPair";

type LoginData = {
    username: string
    password: string
    expiresInMins: number
}

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/auth",
    headers: {},
});

axiosInstance.interceptors.request.use(async (requestObject) => {
    if (requestObject.method?.toUpperCase() === 'GET') {
        const user = await getServerStorage<IUserWithTokens>('user');
        const refreshResponse = await fetch(`http://localhost:3000/auth/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
            })
        });
        const data = await refreshResponse.json();

        if (!refreshResponse.ok) {
            console.error("Failed to refresh token:", data.message);
            return Promise.reject(data.message);
        }

        requestObject.headers.Authorization = `Bearer ${data.accessToken}`;
    }
    return requestObject;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const user: IUserWithTokens = await getServerStorage<IUserWithTokens>("user");
                const refreshResponse = await fetch(`http://localhost:3000/auth/`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: user,
                    })
                });
                const data = await refreshResponse.json();

                if (!refreshResponse.ok) {
                    console.error("Failed to refresh token:", data.message);
                    return Promise.reject(error);
                }

                console.log("Updated accessToken:", data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Error during token refresh:", err);
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);


export const loadAuthRecipes = async (): Promise<IRecipe[]> => {
    const recipes: IRecipe[] = [];
    let skip: number = 0;
    const limit: number = 30;
    let total: number = 1;

    while (skip < total) {
        const {data} = await axiosInstance.get<IBaseResponseModel>(`/recipes?limit=${limit}&skip=${skip}`);
        recipes.push(...(data.recipes ?? []));
        total = data.total;
        skip += limit;
    }

    return recipes as IRecipe[];
}

export const getAllRecipesWithPagination = async (page: number = 1): Promise<IBaseResponseModel> => {
    const limit: number = 30
    const skip: number = limit * page - limit
    const {data} = await axiosInstance.get<IBaseResponseModel>(`/recipes?limit=${limit}&skip=${skip}`);
    return data;
}

export const getAllRecipesWithPaginationAndSearch = async (page: number = 1, search: string): Promise<IBaseResponseModel> => {
    const limit: number = 30
    const skip: number = limit * page - limit
    const {data} = await axiosInstance.get<IBaseResponseModel>(`/recipes/search?q=${search}&limit=${limit}&skip=${skip}`);
    return data;
}

export const getRecipeById = async (id: number): Promise<IRecipe> => {
    const {data} = await axiosInstance.get<IRecipe>(`/recipes/${id}`);
    return data;
}

export const getRecipesWithPaginationByTag = async (tag: string, page: number): Promise<IBaseResponseModel> => {
    const limit: number = 30
    const skip: number = limit * page - limit
    const {data} = await axiosInstance.get<IBaseResponseModel>(`/recipes/tag/${tag}?limit=${limit}&skip=${skip}`);
    return data;
}

export const getAllUsersWithPagination = async (page: number = 1): Promise<IBaseResponseModel> => {
    const limit: number = 30
    const skip: number = limit * page - limit
    const {data} = await axiosInstance.get<IBaseResponseModel>(`/users?limit=${limit}&skip=${skip}`);
    return data;
}

export const getAllUsersWithPaginationAndSearch = async (page: number = 1, search: string): Promise<IBaseResponseModel> => {
    const limit: number = 30
    const skip: number = limit * page - limit
    const {data} = await axiosInstance.get<IBaseResponseModel>(`/users/search?q=${search}&limit=${limit}&skip=${skip}`);
    return data;
}

export const getUserById = async (id: number): Promise<IUser> => {
    const {data} = await axiosInstance.get<IUser>(`/users/${id}`);
    return data;
}

export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserWithTokens> => {
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>("/login", {
        username,
        password,
        expiresInMins
    })
    await setServerStorage<IUserWithTokens>("user", userWithTokens);
    return userWithTokens
}

export const refresh = async (userWithTokens:IUserWithTokens|null): Promise<IUserWithTokens | null> => {
    if(!userWithTokens){
        userWithTokens = await getServerStorage<IUserWithTokens>("user");
    }

    if (!userWithTokens?.refreshToken) {
        console.error("No refreshToken available.");
        return null;
    }

    try {
        const { data } = await axiosInstance.post<ITokenPair>("/refresh", {
            refreshToken: userWithTokens.refreshToken,
            expiresInMins: 1
        });

        if (data.accessToken && data.refreshToken) {
            userWithTokens.accessToken = data.accessToken;
            userWithTokens.refreshToken = data.refreshToken;

            return userWithTokens;
        } else {
            console.error("No new tokens received from refresh endpoint.");
            return null;
        }
    } catch (error) {
        console.error("Error during token refresh:", error);
        return null;
    }
};


export const logout = async (): Promise<void> => {
    await removeServerStorage('user');
}