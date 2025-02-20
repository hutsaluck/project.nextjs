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
    const user = await getServerStorage<IUserWithTokens>('user');
    if (requestObject.method?.toUpperCase() === 'GET' && user?.accessToken) {
        requestObject.headers.Authorization = `Bearer ${user.accessToken}`;
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
                const user = await getServerStorage<IUserWithTokens>("user");
                console.log("Current refreshToken:", user?.refreshToken);

                if (user?.refreshToken) {
                    const updatedUser = await refresh();

                    console.log("Updated accessToken:", updatedUser?.accessToken);

                    if (updatedUser?.accessToken) {
                        originalRequest.headers.Authorization = `Bearer ${updatedUser.accessToken}`;
                        return axiosInstance(originalRequest);
                    } else {
                        console.error("No accessToken found after refresh.");
                    }
                } else {
                    console.error("No refreshToken available.");
                }
            } catch (err) {
                console.error('Error during token refresh:', err);
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

export const getRecipeBySearchQuery = async (searchQuery: string): Promise<IBaseResponseModel> => {
    const {data} = await axiosInstance.get<IBaseResponseModel>(`/recipes/search?q=${searchQuery}`);
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

export const getUserBySearchQuery = async (searchQuery: string): Promise<IBaseResponseModel> => {
    const {data} = await axiosInstance.get<IBaseResponseModel>(`/users/search?q=${searchQuery}`);
    return data;
}

export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserWithTokens> => {
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>("/login", {
        username,
        password,
        expiresInMins
    })
    setServerStorage<IUserWithTokens>("user", userWithTokens);
    return userWithTokens
}

export const refresh = async (): Promise<IUserWithTokens> => {
    const userWithTokens = await getServerStorage<IUserWithTokens>("user");
    const {
        data: {
            accessToken,
            refreshToken
        }
    } = await axiosInstance.post<ITokenPair>("/refresh", {
        refreshToken: userWithTokens.refreshToken,
        expiresInMins: 1
    });
    userWithTokens.accessToken = accessToken;
    userWithTokens.refreshToken = refreshToken;
    setServerStorage<IUserWithTokens>("user", userWithTokens);

    return userWithTokens;
}

export const logout = async (): Promise<void> => {
    removeServerStorage('user');
}