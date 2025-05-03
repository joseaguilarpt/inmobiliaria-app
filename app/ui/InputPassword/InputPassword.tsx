import "./InputPassword.scss";

import React, { forwardRef } from "react";
import InputText, {
  InputTextProps,
  InputTextRef,
} from "../InputText/InputText";
import { useI18n } from "~/context/i18nContext";
import Icon from "../Icon/Icon";

export interface PasswordInputProps extends Omit<InputTextProps, "type"> {
  showPasswordToggle?: boolean;
}

const PasswordInput: React.ForwardRefRenderFunction<
  InputTextRef,
  PasswordInputProps
> = ({ showPasswordToggle = true, ...props }, ref) => {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="password-input">
      <InputText
        ref={ref}
        {...props}
        type={showPassword ? "text" : "password"}
      />
      {showPasswordToggle && (
        <button
          type="button"
          className="password-input__toggle-button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? t("Hide password") : t("Show password")}
        >
          {showPassword ? (
            <Icon size="small" icon="FaEyeSlash" />
          ) : (
            <Icon size="small" icon="FaEye" />
          )}
        </button>
      )}
    </div>
  );
};

export default forwardRef(PasswordInput);
