import {FC} from "react";
import {Metadata} from "next";
import {IUser} from "@/models/IUser";
import {UserPageComponent} from "@/components/UserPageComponent";
import {MenuComponent} from "@/components/MenuComponent";
import {getUserById, loadAuthRecipes} from "@/services/api.service";
import {IRecipe} from "@/models/IRecipe";

type Props = {
    params: Promise<{id: string}>
}

export const generateMetadata = async ({params}:Props): Promise<Metadata> => {
    const {id} = await params

    return {
        title: `User Page ${id}`
    }
}
const UserPage:FC<Props> = async ({params}) => {
    const {id} = await params
    const user: IUser = await getUserById(Number(id));
    const recipes: IRecipe[] = await loadAuthRecipes();

    const userRecipes = recipes.filter((recipe) => recipe.userId === Number(id));

    return (
        <div>
            <MenuComponent/>
            {user && (
                <UserPageComponent user={user} recipes={userRecipes}/>
            )}
        </div>
    );
};

export default UserPage;