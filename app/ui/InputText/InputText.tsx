import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import classNames from 'classnames';
import './InputText.scss';
import { useI18n } from '~/context/i18nContext';

export interface InputTextProps {
  id?: string;
  type?: string;
  label: string;
  placeholder?: string;
  isLabelVisible?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  hintText?: string;
  clearButton?: boolean;
  leftIcon?: React.ReactNode;
  value?: string; // Controlled input value
  defaultValue?: string; // Uncontrolled input initial value
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  validateFormat?: (value: string) => boolean;
  error?: string; // Add error prop
  className?: string; // Optional class name
  autoComplete?: 'no'| 'yes';
}

export interface InputTextRef {
  validate: () => boolean;
  clear: () => void;
  getValue: () => string;
}

const InputText: React.ForwardRefRenderFunction<InputTextRef, InputTextProps> = (
  {
    id,
    type = 'text',
    label,
    placeholder = '',
    isLabelVisible = true,
    isRequired = false,
    isDisabled = false,
    hintText,
    clearButton = false,
    leftIcon,
    value,
    defaultValue = '',
    onChange,
    onFocus,
    onBlur,
    validateFormat,
    error,
    className,
    autoComplete = 'no'
  },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  // Initialize input value
  const initialValue = value !== undefined ? value : defaultValue;
  const [inputValue, setInputValue] = useState<string>(initialValue);

  // Update input value and call onChange if controlled
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;
    setInputValue(inputValue);
    if (onChange) {
      onChange(inputValue);
    }
  };

  // Handle focus and blur events
  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  // Imperative handle methods for external access
  useImperativeHandle(ref, () => ({
    validate: () => {
      const value = inputRef.current ? inputRef.current.value : '';
      if (isRequired && !value.trim()) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        return false;
      }
      if (validateFormat && !validateFormat(value)) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        return false;
      }
      return true;
    },
    clear: () => {
      setInputValue('');
      if (onChange) {
        onChange('');
      }
    },
    getValue: () => {
      return inputRef.current ? inputRef.current.value : '';
    },
  }));

  // Update input value if controlled prop changes
  useEffect(() => {
    setInputValue(value ?? '');

  }, [value]);

  return (
    <div className={classNames('input-text', className)}>
      <label className={classNames('input-text__label', { 'input-text__label--hidden': !isLabelVisible })} htmlFor={id}>
        {t(label)} {isRequired && <span aria-hidden="true">*</span>}
      </label>
      <div className={classNames('input-text__wrapper', { 'input-text__wrapper--error': error })}>
        {leftIcon && <div className="input-text__icon">{leftIcon}</div>}
        <input
          ref={inputRef}
          type={type}
          id={id}
          name={id}
          className={classNames('input-text__input', { 'input-text__input--error': error })}
          placeholder={t(placeholder)}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={isRequired}
          disabled={isDisabled}
          aria-required={isRequired}
          aria-disabled={isDisabled}
          aria-label={t(label)}
          defaultValue={value}
          data-id={id}
          autoComplete={autoComplete}
        />
        {clearButton && (
          <button
            type="button"
            className="input-text__clear-button"
            onClick={() => {
              setInputValue('');
              if (onChange) {
                onChange('');
              }
            }}
            aria-label="Clear text input"
          >
            ✖
          </button>
        )}
      </div>
      {error && <div className="input-text__error">{error}</div>}
      {hintText && <div className="input-text__hint">{t(hintText)}</div>}
    </div>
  );
};

export default forwardRef(InputText);
