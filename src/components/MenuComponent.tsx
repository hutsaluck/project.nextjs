'use client'

import { IUserWithTokens } from "@/models/IUserWithTokens";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { logoutUser } from "@/server-actions/serverActions";
import MenuIcon from "@/icons/MenuIcon";
import {CloseIcon} from "@/icons/CloseIcon";


export const MenuComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUserWithTokens | null>(null);

    const handleLogout = async () => {
        await logoutUser();
        setIsAuthenticated(false);
        setUser(null);
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <nav className="flex justify-between items-center my-5 mx-5 z-9">
            <Link href="/" className="text-2xl font-extrabold uppercase text-black hover:text-gray-500">
                Logo
            </Link>
            <button
                className="block md:hidden text-black focus:outline-none cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon className="cursor-pointer" /> : <MenuIcon className="cursor-pointer" />}
            </button>
            <ul
                className={`
                    flex-col md:flex-row md:flex list-none gap-5 items-center z-9 
                    absolute md:static top-16 right-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-5 md:p-0 
                    transition-transform duration-300 ${isOpen ? "flex h-screen" : "hidden"} md:flex`}
            >
                {!isAuthenticated && (
                    <li>
                        <Link href="/login" className="capitalize text-black no-underline hover:text-gray-500">
                            Login
                        </Link>
                    </li>
                )}
                {isAuthenticated && (
                    <>
                        <li>
                            <Link href="/users" className="capitalize text-black no-underline hover:text-gray-500">
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link href="/recipes" className="capitalize text-black no-underline hover:text-gray-500">
                                Recipes
                            </Link>
                        </li>
                        <li className="relative group">
                            <Link href={`/users/${user?.id}`} className="capitalize text-black no-underline hover:text-gray-500">
                                <img
                                    className="w-10 rounded-full cursor-pointer"
                                    src={user?.image}
                                    alt={user?.username}
                                />
                            </Link>
                            {!isOpen && (<div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                                >
                                    Logout
                                </button>
                            </div>)}
                        </li>
                        {isOpen && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer capitalize text-black no-underline hover:text-gray-500"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};
