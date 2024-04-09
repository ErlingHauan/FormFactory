import React from "react";
import { Heading, Link } from "@digdir/design-system-react";
import { ClipboardCheckmarkFillIcon } from "@navikt/aksel-icons";
import classes from "./Header.module.css";
import { Navigation } from "../Navigation";
export const Header = (): React.JSX.Element => {
  const HeadingBrand = () => (
    <Link href="/" className={classes.brandLink}>
      <Heading level={1} size="medium">
        Form Factory
      </Heading>
      <ClipboardCheckmarkFillIcon className={classes.headerIcon} />
    </Link>
  );

  const isFormViewer = window.location.pathname.startsWith("/view");
  if (isFormViewer) return;

  return (
    <div className={classes.header}>
      <HeadingBrand />
      <Navigation />
    </div>
  );
};
