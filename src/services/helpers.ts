'use server'

import {cookies} from 'next/headers';

export const getServerStorage = async <T>(key: string): Promise<T> => {
    const cookieStore = await cookies();
    const value = cookieStore.get(key);
    if (!value) {
        return value as T;
    }
    return JSON.parse(value.value) as T;
};

export const setServerStorage = async <T>(key: string, value: T): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set(key, JSON.stringify(value), {maxAge: 60 * 60 * 24 * 7, path: '/'});
};

export const removeServerStorage = async (key: string): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set(key, '', {
        maxAge: 0,
        path: '/',
    });
};
