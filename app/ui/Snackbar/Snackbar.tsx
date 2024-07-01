import React, { useEffect } from "react";
import classNames from "classnames";
import "./Snackbar.scss";
import { useTheme } from "~/context/ThemeContext";
import Text from "../Text/Text";
import { useI18n } from "~/context/i18nContext";

const Snackbar = () => {
  const { snackbar, hideSnackbar } = useTheme();
  const { t } = useI18n();

  const title: any = {
    success: t("successTitle"),
    warning: t("alertTitle"),
    info: t("infoTitle"),
    error: t("errorTitle"),
  };

  useEffect(() => {
    if (snackbar.message) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [snackbar, hideSnackbar]);

  if (!snackbar.message) return null;

  return (
    <div className={classNames("snackbar", `snackbar--${snackbar.type}`)}>
      <div>
        <Text textWeight="bold">{title[snackbar.type]}:</Text>
        <div>
          {" "}
          <Text>{snackbar.message}</Text>
        </div>
      </div>
      <button className="snackbar__close" onClick={hideSnackbar}>
        ×
      </button>
    </div>
  );
};

export default Snackbar;
