// Breadcrumb.tsx

import React from "react";
import "./Breadcrumbs.scss";
import { Link } from "@remix-run/react";

export interface BreadcrumbProps {
  paths: BreadcrumbPath[];
}

interface BreadcrumbPath {
  label: string;
  href?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb__list">
        {paths.map((path, index) => (
          <li key={index} className="breadcrumb__item">
            {path.href ? (
              <Link to={path.href} className="breadcrumb__link">
                {path.label}
              </Link>
            ) : (
              <span className="breadcrumb__label">{path.label}</span>
            )}
            {index !== paths.length - 1 && (
              <span className="breadcrumb__label u-pl1"> / </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
