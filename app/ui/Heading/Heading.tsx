// app/components/Heading.tsx
import React from "react";
import classNames from "classnames";
import "./Heading.scss";

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  appearance?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;
  children: React.ReactNode;
  underline?: boolean;
  align?: "left" | "center" | "right";
}

const Heading: React.FC<HeadingProps> = ({
  level,
  color,
  children,
  appearance = 1,
  underline,
  align
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={classNames(
        "heading",
        `heading--h${appearance}`,
        color && `heading--${color}`,
        underline && `heading--underline`,
        align && `heading--${align}`
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
