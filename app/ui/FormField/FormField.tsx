import './FormField.scss';

import GridContainer from "~/ui/Grid/Grid";
import InputText from "~/ui/InputText/InputText";
import Button, { ButtonProps } from "~/ui/Button/Button";
import InputArea from "~/ui/InputArea/InputArea";
import { useI18n } from "~/context/i18nContext";
import ButtonGroup from "~/ui/ButtonGroup/ButtonGroup";
import { Form } from "@remix-run/react";
import InputPhone from "../InputPhone/InputPhone";
import InputEmail from "../InputEmail/InputEmail";
import React, { useState } from "react";
import AutoSuggest from "../AutoSuggest/AutoSuggest";
import classNames from "classnames";
import GridItem from "../Grid/GridItem";
import { InputSearchLocation } from '../InputSearchLocation/InputSearchLocation';
import Multiselect from '../Multiselect/Multiselect';

interface RadioOption {
  id: string;
  label: string;
}

interface InputField {
  id: string;
  type: "text" | "phone" | "email" | "area";
  size?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  label: string;
  isLabelVisible: boolean;
  placeholder?: string;
  autoComplete?: "no" | "yes";
}

interface RadioInput {
  type: "radio";
  options: RadioOption[];
  defaultSelectedOption: string;
  size: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  isLabelVisible: boolean;
  label: string;
  id: string;
  leftIcon?: boolean;
}

interface AutosuggestInput {
  type: "autosuggest" | 'searchLocation' | 'multiselect';
  options: RadioOption[];
  size: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  value: string;
  isLabelVisible: boolean;
  label: string;
  id: string;
}

type InputType = RadioInput | InputField | AutosuggestInput;

const DynamicField = ({
  input,
  onChange,
  autoComplete,
  formData,
}: {
  input: InputType;
  onChange: (id: string, value: any) => void;
  autoComplete?: InputField["autoComplete"];
  formData: Record<string, any>;
}) => {
  switch (input.type) {
    case "text":
      return (
        <InputText
          key={input.id}
          autoComplete={autoComplete}
          {...input}
          value={formData[input.id]}
          onChange={(value) => onChange(input.id, value)}
        />
      );
    case "phone":
      return (
        <InputPhone
          key={input.id}
          autoComplete={autoComplete}
          {...input}
          value={formData[input.id]}
          onChange={(value) => onChange(input.id, value)}
        />
      );
    case "email":
      return (
        <InputEmail
          key={input.id}
          autoComplete={autoComplete}
          {...input}
          value={formData[input.id]}
          onChange={(value) => onChange(input.id, value)}
        />
      );
    case "area":
      return (
        <InputArea
          autoComplete={autoComplete}
          key={input.id}
          {...input}
          value={formData[input.id]}
          onChange={(value) => onChange(input.id, value)}
        />
      );
    case "radio":
      const radioInput = input as RadioInput;
      return (
        <ButtonGroup
          key={input.id}
          selectedValue={formData[input.id] ?? radioInput.defaultSelectedOption}
          onChange={(selectedId) => onChange(input.id, selectedId)}
          {...input}
        />
      );
    case "autosuggest":
      return (
        <AutoSuggest
          key={input.id}
          {...input}
          value={formData[input.id]}
          onChange={(value) => onChange(input.id, value)}
        />
      );
    case "searchLocation":
      return (
        <InputSearchLocation
          key={input.id}
          {...input}
          value={formData[input.id]}
          onChange={(value) => onChange(input.id, value)}
        />
      );
      case "multiselect":
        return (
          <Multiselect
            key={input.id}
            {...input}
            onChange={(value) => onChange(input.id, value)}
          />
        );
    default:
      return null;
  }
};

export interface GetInTouchForm {
  type: "get" | "post" | "put" | "patch" | "delete";
  inputs: InputType[];
  hasSubmit: boolean;
  buttonLabel?: string;
  id?: string;
  isLoading?: boolean;
  autoComplete?: "no" | "yes";
  submitAppareance?: ButtonProps["appareance"];
  className?: string;
  buttonClassname?: string;
  initialValue?: any;
  onSubmit?: (formData: Record<string, any>) => void; // Adjusted onSubmit signature
  onChange?: (formData: Record<string, any>) => void; // Adjusted onSubmit signature
}

const FormField = ({
  type = "post",
  inputs = [],
  hasSubmit = true,
  buttonLabel = "",
  id = "form-id",
  onSubmit = () => {},
  onChange,
  isLoading,
  autoComplete = "no",
  submitAppareance = "link",
  className,
  buttonClassname,
  initialValue
}: GetInTouchForm) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (id: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (onChange) {
      onChange({ ...formData, [id]: value });
    }
  };

  React.useEffect(() => {
    if (initialValue) {
      setFormData(initialValue)
    }
  }, [initialValue])

  return (
    <form
      className={classNames("u-pt4 u-pb1", 'form-field', className)}
      method={type}
      id={id}
    >
      <GridContainer>
        {inputs.map((input, i) => {
          const size = input.size ?? {};
          let inputClass: string[] = []
          Object.entries(size).forEach(([item, value]) => {
            if (value === 0 && item === 'xs') {
              inputClass = [...inputClass, item + '--hidden']
            }
          });
          return (
            <GridItem className={classNames("u-pr2",  ...inputClass)} key={i} {...size}>
              <DynamicField
                input={input}
                autoComplete={autoComplete}
                formData={formData}
                onChange={handleChange}
              />
            </GridItem>
          );
        })}
      </GridContainer>
      {hasSubmit && (
        <GridContainer justifyContent="center">
          <div className="u-pt2">
            <Button
              className={buttonClassname ?? ''}
              isLoading={isLoading}
              appareance={submitAppareance}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(formData);
              }}
            >
              {t(buttonLabel ?? "getInTouch_form.button")}
            </Button>
          </div>
        </GridContainer>
      )}
    </form>
  );
};

export default FormField;
