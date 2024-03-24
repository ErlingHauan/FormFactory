import React from "react";
import classes from "./SubHeader.module.css";

interface SubHeaderProps {
  children: React.ReactNode;
}

export const SubHeader: React.FC<SubHeaderProps> = ({ children }) => {
  return (
    <>
      <div className={classes.subHeader}>{children}</div>
    </>
  );
};
