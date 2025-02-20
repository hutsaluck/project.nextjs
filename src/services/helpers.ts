'use server'

import {cookies} from 'next/headers';

// Типізація для отримання значення cookie з заголовків запиту
export const getServerStorage = async <T>(key: string): Promise<T> => {
    const cookieStore = await cookies();
    const value = cookieStore.get(key);
    if (!value) {
        return value as T;
    }
    return JSON.parse(value.value) as T;
};

// Типізація для запису значення в cookie
export const setServerStorage = async <T>(key: string, value: T): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set(key, JSON.stringify(value), {maxAge: 60 * 60 * 24 * 7, path: '/'});
};

// Видалення cookie
export const removeServerStorage = async (key: string): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set(key, '', {
        maxAge: 0, // відразу видаляє cookie
        path: '/',
    });
    // Знову ж таки, res.setHeader не потрібно, оскільки cookies() обробляє все автоматично.
};
