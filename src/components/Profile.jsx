import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";

const Profile = () => {
    const { user, isLoading } = useAuth0()

    return (
        isLoading ?
            <Spinner /> :
            <div className="m-5">
                <h2>Welcome, {user.nickname}</h2>
            </div>
    );
}

export default Profile;