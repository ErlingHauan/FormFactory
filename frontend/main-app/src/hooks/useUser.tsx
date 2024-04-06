import { getApiUrl } from "../components/Login/LoginUtils";
import axios from "axios";
import { User } from "../types";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/api/user`;

    const fetchUser = async () => {
      try {
        const result = await axios.get(targetUrl, {
          withCredentials: true,
        });
        setUser(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, isLoading };
};
