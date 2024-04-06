import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getApiUrl } from "../components/Login/LoginUtils";
import axios from "axios";

// Verifies the user's session via an API call. If not verified, it redirects to the login page.
// It should be used in components that require the user to be logged in.

export const useAuthorization = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserCookie = async () => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/user`;

      try {
        await axios.get(targetUrl, {
          withCredentials: true,
        });
      } catch (error) {
        console.error(error);
        navigate("/login/authError");
      }
    };

    verifyUserCookie();
  }, [navigate]);
};
