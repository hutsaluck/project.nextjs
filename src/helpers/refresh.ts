import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type RefreshResponse = {
    accessToken?: string;
    message?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RefreshResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const response = await fetch("https://your-auth-server.com/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to refresh token");
        }

        // Встановлюємо новий accessToken у cookies
        res.setHeader(
            "Set-Cookie",
            serialize("accessToken", data.accessToken, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 15,
            })
        );

        return res.status(200).json({ accessToken: data.accessToken });
    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
}
