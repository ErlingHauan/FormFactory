import { getApiUrl } from "../utils/getApiUrl";
import axios from "axios";
import { User } from "../types";
import { useEffect, useState } from "react";

export const useUserSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/user`;

    (async () => {
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
    })();
  }, []);

  return { user, isLoading };
};
