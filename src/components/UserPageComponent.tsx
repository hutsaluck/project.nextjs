import { IUser } from "@/models/IUser";
import { IRecipe } from "@/models/IRecipe";
import { RecipesComponent } from "@/components/RecipesComponent";
import Image from "next/image";

interface UserPageComponentProps {
    user: IUser;
    recipes: IRecipe[];
}

export const UserPageComponent = ({ user, recipes }: UserPageComponentProps) => {
    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-5">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-5 mb-8">
                    {user.image && (
                        <div className="w-50 h-50 relative">
                            <Image
                                src={user.image}
                                alt={`${user.firstName} ${user.lastName}`}
                                width={200}
                                height={200}
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-gray-500">Maiden Name: {user.maidenName}</p>
                        <p className="text-gray-500">Username: @{user.username}</p>
                        <p className="text-gray-500">Birth Date: {user.birthDate}</p>
                        <p className="text-gray-500">Age: {user.age}</p>
                        <p className="text-gray-500">Gender: {user.gender}</p>
                        <p className="text-gray-500">Blood Group: {user.bloodGroup}</p>
                        <p className="text-gray-500">Height: {user.height} cm</p>
                        <p className="text-gray-500">Weight: {user.weight} kg</p>
                        <p className="text-gray-500">Eye Color: {user.eyeColor}</p>
                        <p className="text-gray-500">
                            Hair: {user.hair.type} ({user.hair.color})
                        </p>
                        <p className="text-gray-500">IP: {user.ip}</p>
                        <p className="text-gray-500">MAC: {user.macAddress}</p>
                        <p className="text-gray-500">University: {user.university}</p>
                        <p className="text-gray-500">Role: {user.role}</p>
                        <p className="text-gray-500">User Agent: {user.userAgent}</p>
                        <p className="text-gray-500">EIN: {user.ein}</p>
                        <p className="text-gray-500">SSN: {user.ssn}</p>
                        <p>
                            <a href={`mailto:${user.email}`} className="font-bold hover:text-gray-500">
                                {user.email}
                            </a>
                        </p>
                        <p>
                            <a href={`tel:${user.phone}`} className="font-bold hover:text-gray-500">
                                {user.phone}
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {recipes.length > 0 && (
                <div className="mt-8">
                    <RecipesComponent recipes={recipes} />
                </div>
            )}
        </div>
    );
};
