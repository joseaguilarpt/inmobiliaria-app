import React, { useState } from "react";
import classNames from "classnames";
import "./Pills.scss";
import { useI18n } from "~/context/i18nContext";

export interface PillItem {
  label: string;
  id: string;
}

export interface PillsProps {
  items: PillItem[];
  defaultActiveIndex?: number;
  onPillSelect?: (id: string) => void;
  onPillRemove?: (id: string) => void;
  className?: string;
}

const Pills: React.FC<PillsProps> = ({ items, onPillRemove, className }) => {
    const { t} = useI18n();
  const handlePillRemove = (id: string) => {
    if (onPillRemove) {
      onPillRemove(id);
    }
  };

  return (
    <div className={classNames("pills", className)}>
      {items.map((item) => (
        <div key={item.id} className="pill-container">
          <button
            className={classNames("pill", {})}
            onClick={() => handlePillRemove(item.id)}
          >
            {t(item.label)} &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pills;
