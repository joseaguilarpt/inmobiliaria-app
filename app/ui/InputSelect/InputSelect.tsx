import React, { useEffect, useState, useRef } from 'react';
import "./InputSelect.scss";
import Button from "../Button/Button";
import useOutsideClick from '../../utils/useOutsideClick'; // Adjust the path based on your project structure

interface Option {
  id: number;
  value: string;
  label: string;
}

interface InputSelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  label: string;
  initialValue?: string; // For uncontrolled initial value
  value?: string; // For controlled value
  className?: string; // Optional className prop
}

const InputSelect: React.FC<InputSelectProps> = ({
  options,
  onSelect,
  label,
  initialValue,
  value: controlledValue,
  className = "", // Default value if className is not provided
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue ?? "");
  const selectRef = useRef<HTMLDivElement>(null);

  // Update selectedOption when controlledValue changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedOption(controlledValue);
    }
  }, [controlledValue]);

  // Close dropdown when clicking outside
  useOutsideClick(selectRef, () => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    onSelect(value);
    setIsOpen(false);
  };

  const current = options.find((item) => item.value === selectedOption);
  let selected = initialValue || ""; // Use initialValue for uncontrolled or controlledValue for controlled
  if (current) {
    selected = current.label;
  }

  return (
    <div className={`input-select ${className}`} ref={selectRef}>
      <button onClick={toggleDropdown}>
        {selected}
        <span className="input-select__arrow">&#9660;</span>
      </button>
      {isOpen && (
        <div className="input-select__options">
          {options.map((option) => (
            <div
              key={option.id}
              className="input-select__option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSelect;
