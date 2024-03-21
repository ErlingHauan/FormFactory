import React, { useState, useEffect } from "react";
import { Button, Popover } from "@digdir/design-system-react";
import { ClipboardLinkFillIcon, CheckmarkIcon, FileTextIcon } from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";
import classes from "./DashboardAccordion.module.css";

interface ShareFormProps {
  id: number;
}

export const ShareForm: React.FC<ShareFormProps> = ({ id }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { t } = useTranslation();

  const copyLink = (id: number) => {
    const url = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(url);
  };

  const CopyLinkButton = () => {
    return (
      <Button
        size="small"
        variant="secondary"
        onClick={() => {
          setIsLinkCopied(true);
          copyLink(id);
        }}
        color={isLinkCopied ? "success" : "first"}
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

  useEffect(() => {
    if (isLinkCopied) {
      const timer = setTimeout(() => {
        setIsLinkCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLinkCopied]);

  return (
    <Popover variant="info">
      <Popover.Trigger variant="secondary" size="small" className={classes.button}>
        <ClipboardLinkFillIcon />
        {t("dashboard.share.form")}
      </Popover.Trigger>
      <Popover.Content>
        <div className={classes.popoverButtons}>
          <Button size="small" variant="secondary">
            <FileTextIcon />
            {t("dashboard.view.form")}
          </Button>
          <CopyLinkButton />
        </div>
      </Popover.Content>
    </Popover>
  );
};
