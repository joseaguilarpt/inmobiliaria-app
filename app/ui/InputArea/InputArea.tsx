import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import classNames from 'classnames';
import './InputArea.scss';
import { useI18n } from '~/context/i18nContext';

interface InputAreaProps {
  id?: string;
  label: string;
  placeholder?: string;
  isLabelVisible?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  hintText?: string;
  value?: string; // Controlled input value
  defaultValue?: string; // Uncontrolled input initial value
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  rows?: number;
  className?: string; // Optional className prop
}

export interface InputAreaRef {
  validate: () => boolean;
  clear: () => void;
  getValue: () => string;
}

const InputArea: React.ForwardRefRenderFunction<InputAreaRef, InputAreaProps> = ({
  id,
  label,
  placeholder = '',
  isLabelVisible = true,
  isRequired = false,
  isDisabled = false,
  hintText,
  value,
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  rows = 3, // Default number of rows
  className,
}, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useI18n();

  // Initialize input value for uncontrolled component
  const initialValue = value !== undefined ? value : defaultValue;
  const [inputValue, setInputValue] = useState<string>(initialValue);

  // Update input value and call onChange if controlled
  const handleChange = () => {
    const value = textareaRef.current ? textareaRef.current.value : '';
    setInputValue(value);
    if (onChange) {
      onChange(value);
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
      const value = textareaRef.current ? textareaRef.current.value : '';
      if (isRequired && !value.trim()) {
        if (textareaRef.current) {
          textareaRef.current.focus();
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
      return textareaRef.current ? textareaRef.current.value : '';
    }
  }));

  // Update input value if controlled prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <div className={classNames('input-area', className)}>
      <label className={classNames("input-area__label", { "input-area__label--hidden": !isLabelVisible })} htmlFor={id}>
        {t(label)} {isRequired && <span aria-hidden="true">*</span>}
      </label>
      <textarea
        ref={textareaRef}
        id={id}
        name={id}
        className="input-area__input"
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
        rows={rows}
      />
      {hintText && <div className="input-area__hint">{t(hintText)}</div>}
    </div>
  );
};

export default forwardRef(InputArea);
