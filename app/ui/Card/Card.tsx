import React, { ReactNode } from "react";
import classNames from "classnames";
import "./Card.scss";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";
import Button from "../Button/Button";
import Icon, { IconType } from "../Icon/Icon";
import GridContainer from "../Grid/Grid";
import { useI18n } from "~/context/i18nContext";

interface CardProps {
  title?: string;
  content?: string;
  imageUrl?: string;
  imagePosition?: "top" | "left" | "right";
  className?: string;
  url?: string;
  shadow?: boolean;
  unstyled?: boolean;
  layout?: string;
  children?: ReactNode;
  underline?: boolean;
  icon?: string;
  iconType?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  imageUrl,
  imagePosition = "left",
  className,
  shadow,
  url,
  underline,
  unstyled,
  icon,
  iconType = "circle",
  children,
}) => {
  const { t } = useI18n();
  const cardClasses = classNames(
    "card",
    className,
    shadow && "__shadow",
    unstyled && "__unstyled",
    {
      [`card--image-${imagePosition}`]: imageUrl,
      [`card--icon-${imagePosition}`]: icon,
    }
  );

  // @ts-ignore
  const iconValue: IconType = icon ? t(icon) : 'Fa500Px';

  return (
    <div
      className={cardClasses}
      role="region"
      aria-labelledby={title ? `${title}-title` : undefined}
    >
      <>
        {icon && (
          <div className="__icon-wrapper">
            <div
              className={classNames(
                "__icon-container",
                "u-mb2 u-mt2 u-ml4",
                iconType
              )}
            >
              <div style={{ zIndex: 2, position: "relative" }}>
                <Icon icon={iconValue} size="large" />
              </div>
            </div>
          </div>
        )}
        {imageUrl && (
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={classNames("card__image", `image-${imagePosition}`)}
          ></div>
        )}
        <div className="card__content">
          {title && (
            <Heading
              align="left"
              underline={underline}
              level={3}
              appearance={6}
            >
              {t(title)}
            </Heading>
          )}
          {content && (
            <div className={underline ? "u-pt2" : ""}>
              <Text size="small">{t(content)}</Text>
            </div>
          )}
          {url && (
            <GridContainer justifyContent="flex-end" className="u-mt4">
              <Button appareance="link">{t("viewMore")}</Button>
            </GridContainer>
          )}
          {children && children}
        </div>
      </>
    </div>
  );
};

export default Card;
