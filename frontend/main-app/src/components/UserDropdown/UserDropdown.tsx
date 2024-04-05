import React from "react";
import { DropdownMenu, Link } from "@digdir/design-system-react";
import { PersonIcon } from "@navikt/aksel-icons";
import classes from "./UserDropdown.module.css";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserDropdown = (): React.JSX.Element => {
  const navigate = useNavigate();

  const logOutUser = async () => {
    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/api/users/logout`;

    try {
      await axios.post(
        targetUrl,
        {},
        {
          withCredentials: true,
        },
      );
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu size="small">
      <DropdownMenu.Trigger variant="secondary" icon="true">
        <PersonIcon className={classes.userIcon} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group heading="Logged in as user1@example.com">
          <DropdownMenu.Item asChild>
            <Link onClick={logOutUser}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
