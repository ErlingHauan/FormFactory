import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "./useUser";

// Checks if user is logged in. If not, it redirects back to the login page.
export const useAuthorization = () => {
    const {user, isLoading} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !isLoading) {
            navigate("/login/authError")
        }
    }, [user, isLoading]);
};
