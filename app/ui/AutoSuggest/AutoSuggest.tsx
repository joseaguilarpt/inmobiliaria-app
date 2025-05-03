import React, { useState, useEffect, useRef } from "react";
import "./AutoSuggest.scss";
import Text from "../Text/Text";
import classNames from "classnames";
import { useI18n } from "~/context/i18nContext";
import Icon, { IconType } from "../Icon/Icon";

type Option = {
  id: string;
  label: string;
  details?: string;
};

export type AutoSuggestProps = {
  options: Option[];
  placeholder?: string;
  label: string;
  isLabelVisible?: boolean;
  id: string;
  value?: any;
  onChange?: (value: any) => void;
  onQueryChange?: (valuel: any) => void;
  leftIcon?: IconType;
  rightIcon?: IconType;
  clearButton?: boolean;
  showSuggestionsOnFocus?: boolean;
  isLoading?: boolean;
  detailedOption?: boolean;
};

const AutoSuggest: React.FC<AutoSuggestProps> = ({
  options,
  label,
  id,
  isLabelVisible = true,
  placeholder,
  value,
  onChange,
  onQueryChange,
  leftIcon,
  clearButton,
  rightIcon,
  isLoading,
  detailedOption = false,
  showSuggestionsOnFocus = false,
}) => {

  const { t } = useI18n();
  const [query, setQuery] = useState(value || "");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const current = options.find((item) => item.id === value)
    setQuery(current?.label  ?? value?.label ?? value ?? '')
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setActiveIndex(-1);
    if (newValue) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    if (onQueryChange) {
      onQueryChange(newValue);
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
    setActiveIndex(-1);
    if (onChange) {
      onChange("");
    }
  };

  const handleClick = (option: Option) => {
    setQuery(option.label);
    setShowSuggestions(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (activeIndex < filteredOptions.length - 1) {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeIndex > 0) {
        setActiveIndex((prevIndex) => prevIndex - 1);
      }
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        handleClick(filteredOptions[activeIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const filteredOptions = query
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  return (
    <div key={id} className="auto-suggest">
      {isLabelVisible && (
        <label htmlFor={id}>
          <Text className="u-mb1" align="left">
            {t(label)}
          </Text>
        </label>
      )}
      <div className="auto-suggest__wrapper">
        {leftIcon && (
          <div className="auto-suggest__icon">
            <Icon icon={leftIcon} size="small" />
          </div>
        )}
        <input
          autoComplete="no"
          className={classNames(
            "auto-suggest__input",
            leftIcon && "__left-icon"
          )}
          id={id + "-autosugget"}
          name={label + "-autosugget"}
          type="text"
          placeholder={t(placeholder ?? '')}
          aria-label={placeholder ?? label}
          value={query}
          onChange={handleChange}
          onKeyUpCapture={handleKeyDown}
          onFocus={
            showSuggestionsOnFocus ? () => setShowSuggestions(true) : () => {}
          }
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions || query && clearButton && (
          <button
            type="button"
            className="auto-suggest__clear-button"
            onClick={handleClear}
            aria-label="Clear text input"
          >
            <Icon size="small" icon="FaTimes" />
          </button>
        )}
        {rightIcon && (
          <div className="auto-suggest__icon-right">
            <Icon icon={rightIcon} size="small" />
          </div>
        )}
      </div>
      {showSuggestions && (
        <ul className="suggestions" ref={suggestionsRef}>
          {filteredOptions.length > 0 &&
            filteredOptions.map((option, index) => (
              <li
                key={option.id}
                className={index === activeIndex ? "active" : ""}
                onClick={() => handleClick(option)}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <Text>{option.label}</Text>
                {option?.details && <Text textWeight="bold" size="small">{option?.details}</Text>}
              </li>
            ))}
          {filteredOptions.length === 0 && !isLoading && (
            <li  className='disabled' key="no-results">
              <Text>{!query ? "Type something..." : "No Results.."}</Text>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggest;
