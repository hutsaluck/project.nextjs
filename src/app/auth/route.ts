'use server'

import {NextResponse} from "next/server";
import {refresh} from "@/services/api.service";
import {setServerStorage} from "@/services/helpers";
import {IUserWithTokens} from "@/models/IUserWithTokens";

export async function POST(request: Request) {
    try {
        const {user} = await request.json();

        if (!user?.refreshToken) {
            return NextResponse.json({ message: "No refresh token found" }, { status: 401 });
        }
        const updatedUser = await refresh(user);

        if (!updatedUser?.accessToken) {
            return NextResponse.json({ message: "Failed to refresh token" }, { status: 401 });
        }

        const response = NextResponse.json({ accessToken: updatedUser.accessToken });
        response.cookies.set("user", JSON.stringify(updatedUser), {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });
        await setServerStorage<IUserWithTokens>("user", updatedUser);

        return response;
    } catch (error) {
        return NextResponse.json({ message: `Error refreshing token: ${error}` }, { status: 500 });
    }
}
