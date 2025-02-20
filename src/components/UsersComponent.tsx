import {IUser} from "@/models/IUser";
import {UserComponent} from "@/components/UserComponent";

interface UsersComponentProps {
    users: IUser[]
}

export const UsersComponent = async ({users}: UsersComponentProps) => {
    return (
        <div className="grid grid-cols-5 gap-5 justify-center items-start mx-5">
            {users.map((user: IUser) => <UserComponent key={user.id} user={user}/>)}
        </div>
    );
};