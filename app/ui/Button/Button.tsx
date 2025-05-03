import React from "react";
import classNames from "classnames";
import "./Button.scss";
import Tooltip from "../ToolTip/ToolTip";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Icon, { IconType } from "../Icon/Icon"; // Import the Icon component and IconType

export interface ButtonProps {
  appareance?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "outlined"
    | "link"
    | "subtle";
  children: React.ReactNode;
  color?: "default" | "contrast";
  onClick?: (e?: any) => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  ariaLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  fitContainer?: boolean;
  className?: string;
  leftIcon?: IconType; // New prop for left icon
  size?: "small" | "medium" | "large"; // New prop for size
}

const Button: React.FC<ButtonProps> = ({
  appareance = "primary",
  children,
  onClick,
  href,
  color,
  ariaLabel,
  type = "button",
  className,
  isLoading = false,
  isDisabled = false,
  fitContainer = false,
  leftIcon, // Destructure leftIcon prop
  size = "medium", // Destructure size prop with default value
}) => {
  const isLink = appareance === "link";
  const buttonContent = isLoading ? <LoadingSpinner size="small" /> : children;

  const buttonClasses = classNames(
    "button",
    `button--${appareance}`,
    color && `button--${color}`,
    size && `button--${size}`,
    className,
    { "button--disabled": isDisabled || isLoading },
    fitContainer && 'fit-container'
  );

  if (isLink) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={isDisabled || isLoading ? undefined : onClick}
        aria-label={ariaLabel}
        aria-disabled={isDisabled || isLoading}
      >
        {leftIcon && <Icon size={size} icon={leftIcon} />} {/* Render left icon if provided */}
        {buttonContent}
      </a>
    );
  }

  if (ariaLabel) {
    return (
      <Tooltip content={ariaLabel ?? ""}>
        <button
          className={buttonClasses}
          type={type}
          onClick={isDisabled || isLoading ? undefined : onClick}
          aria-label={ariaLabel}
          aria-disabled={isDisabled || isLoading}
          disabled={isDisabled || isLoading}
        >
          {leftIcon && <Icon size={size} icon={leftIcon} />} {/* Render left icon if provided */}
          {buttonContent}
        </button>
      </Tooltip>
    );
  }

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={isDisabled || isLoading ? undefined : onClick}
      aria-label={ariaLabel}
      aria-disabled={isDisabled || isLoading}
      disabled={isDisabled || isLoading}
    >
      {leftIcon && <Icon size={size} icon={leftIcon} />} {/* Render left icon if provided */}
      {buttonContent}
    </button>
  );
};

export default Button;
