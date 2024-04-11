import React from "react";
import { DropdownMenu, Link } from "@digdir/design-system-react";
import { PersonIcon } from "@navikt/aksel-icons";
import classes from "./UserDropdown.module.css";
import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useUserSession } from "../../hooks/useUserSession";

export const UserDropdown = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { user } = useUserSession();

  const logOutUser = async () => {
    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/users/logout`;

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

  const pathname = useLocation().pathname;
  const isLogin = pathname.startsWith("/login") || pathname === "/";
  const isSignup = pathname.startsWith("/signup");
  if (isLogin || isSignup) return;

  return (
    <DropdownMenu size="small">
      <DropdownMenu.Trigger variant="secondary" icon="true" className={classes.dropdownButton}>
        <PersonIcon className={classes.userIcon} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={classes.dropdownMenu}>
        <DropdownMenu.Group heading={user?.email}>
          <DropdownMenu.Item asChild>
            <Link href={"/dashboard"}>{t("dashboard")}</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link onClick={logOutUser}>{t("user.logout")}</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
