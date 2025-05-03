import React, { useEffect, useRef } from "react";
import { IconType } from "react-icons";
import * as Icons from "react-icons/fa";
import classNames from "classnames";
import "./Sidebar.scss";
import { useI18n } from "~/context/i18nContext";

export interface SidebarItem {
  value: string;
  href: string;
  icon: keyof typeof Icons;
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen, onClose, className }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { t} = useI18n();
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Block scroll
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restore scroll
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restore scroll
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="sidebar__overlay" onClick={onClose}></div>}
      <div className={classNames("sidebar", { "sidebar--open": isOpen }, className)} ref={sidebarRef}>
        <button className="sidebar__close" onClick={onClose}>×</button>
        <ul className="sidebar__list">
          {items.map((item, index) => {
            const IconComponent: IconType = Icons[item.icon];
            return (
              <li key={index} className="sidebar__item">
                <a href={item.href} className="sidebar__link">
                  {IconComponent && <IconComponent className="sidebar__icon" />}
                  <span className="sidebar__label">{t(item.value)}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
