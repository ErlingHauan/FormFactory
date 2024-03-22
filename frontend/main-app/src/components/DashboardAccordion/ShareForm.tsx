import React, { useState, useEffect } from "react";
import { Button } from "@digdir/design-system-react";
import { ClipboardLinkFillIcon, CheckmarkIcon } from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";
import classes from "./DashboardAccordion.module.css";

interface ShareForm {
  formUrl: string;
}

export const ShareForm: React.FC<ShareForm> = ({ formUrl }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isLinkCopied) {
      const timer = setTimeout(() => {
        setIsLinkCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLinkCopied]);

  return (
    <Button
      size="small"
      variant="secondary"
      onClick={() => {
        setIsLinkCopied(true);
        navigator.clipboard.writeText(formUrl);
      }}
      color={isLinkCopied ? "success" : "first"}
      className={classes.button}
    >
      {isLinkCopied ? (
        <>
          <CheckmarkIcon />
          {t("dashboard.share.form.copied")}
        </>
      ) : (
        <>
          <ClipboardLinkFillIcon />
          {t("dashboard.share.form")}
        </>
      )}
    </Button>
  );
};
