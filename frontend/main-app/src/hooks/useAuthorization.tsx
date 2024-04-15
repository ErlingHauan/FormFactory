import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSession } from "./useUserSession";

// Checks if user is logged in. If not, it redirects back to the login page.
export const useAuthorization = () => {
  const { user, isLoading } = useUserSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login/authError");
    }
  }, [user, isLoading, navigate]);
};
