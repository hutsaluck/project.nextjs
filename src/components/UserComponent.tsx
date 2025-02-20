import Link from "next/link";
import {IUser} from "@/models/IUser";
import Image from "next/image";

type IUserProps = {
    user: IUser;
}
export const UserComponent = ({user}: IUserProps) => {
    return (
        <Link href={`/users/${user.id}`}>
            <div
                className="overflow-hidden my-10 border border-gray-300 rounded-2xl grid justify-center items-center cursor-pointer transition-shadow duration-500 hover:shadow-lg">
                <div className="overflow-hidden rounded-t-2xl h-64 w-full">
                    <Image
                        src={user.image}
                        alt={user.username}
                        className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-110"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-2xl font-semibold text-center mb-2">
                        {user.firstName} {user.lastName}
                    </h3>
                    <div
                        className="text-center max-h-[160px] hover:max-h-full overflow-hidden text-ellipsis transition-all duration-300">
                        <p>birth date: {user.birthDate}</p>
                        <p>email: {user.email}</p>
                        <p>phone: {user.phone}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};