import Link from "next/link";
import {IUserWithTokens} from "@/models/IUserWithTokens";

interface Props {
    user: IUserWithTokens | null;
}

export const HomeComponent = ({user}: Props) => {

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md text-center space-y-8 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Welcome to the Application
                </h1>
                {user && (
                    <p className="text-base md:text-lg text-gray-600">
                        Hi, {user.firstName}!
                    </p>
                )}
                {!user && (
                    <>
                        <p className="text-base md:text-lg text-gray-600 m-5">
                            You need to authenticate to access the application.
                        </p>
                        <Link
                            href="/login"
                            className="block my-5 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >
                            Go to Login Page
                        </Link>
                    </>
                )}
            </div>
        </main>

    );
};