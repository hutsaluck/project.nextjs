import {HomeComponent} from "@/components/HomeComponent";
import {MenuComponent} from "@/components/MenuComponent";
import {getServerStorage} from "@/services/helpers";
import {IUserWithTokens} from "@/models/IUserWithTokens";

export default async function Home() {
    const userWithTokens = await getServerStorage<IUserWithTokens>("user");
    return (
        <>
            <MenuComponent/>
            <HomeComponent user={userWithTokens}/>
        </>
    );
}