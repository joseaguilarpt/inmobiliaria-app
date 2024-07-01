import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./ButtonGroup.scss";
import Text from "../Text/Text";
import { useI18n } from "~/context/i18nContext";

export interface ButtonOption {
  id: string;
  label: string;
}

interface ButtonGroupProps {
  options: ButtonOption[];
  ariaLabel?: string;
  label?: string;
  isLabelVisible?: boolean;
  onChange?: (value: string) => void; // Updated onChange to return value
  selectedValue?: string | null; // Controlled selected value
  defaultSelectedValue?: string | null; // Uncontrolled initial selected value
  name?: string; // Allow custom name for radio group
  className?: string; // Optional className prop
  id: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  ariaLabel,
  label,
  id,
  isLabelVisible = true,
  onChange,
  selectedValue, // Controlled selected value
  defaultSelectedValue = null, // Uncontrolled initial selected value
  className, // Optional className prop
}) => {
  const { t } = useI18n();
  const [internalSelectedValue, setInternalSelectedValue] =
    useState(defaultSelectedValue);

  // Effect to update internal state when controlled prop changes
  useEffect(() => {
    if (selectedValue !== undefined && selectedValue !== null) {
      if (onChange) {
        onChange(selectedValue); // Propagate change to parent if controlled
      } else {
        setInternalSelectedValue(selectedValue);
      }
    }
  }, [selectedValue]);

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value); // Propagate change to parent if controlled
    } else {
      setInternalSelectedValue(value); // Update internal state if uncontrolled
    }
  };

  return (
    <div
      className={classNames("button-group", className)}
      aria-label={ariaLabel}
    >
      {isLabelVisible && label && (
        <span className="button-group__label">
          <Text>{t(label)}</Text>
        </span>
      )}
      <div className="button-group__buttons">
        {options.map((option) => (
          <label
            key={option.id}
            className={classNames("button-group__button", {
              "button-group__button--active":
                (selectedValue || internalSelectedValue) === option.id,
            })}
          >
            <input
              type="radio"
              id={option.id}
              name={id}
              checked={
                (selectedValue && selectedValue === option.id) ||
                (!selectedValue && internalSelectedValue === option.id)
              }
              className="button-group__input"
              onChange={() => handleChange(option.id)}
              aria-checked={
                (selectedValue || internalSelectedValue) === option.id
                  ? "true"
                  : "false"
              }
              data-id={option.id} // Include data-id attribute for identification
            />
            {t(option.label)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
