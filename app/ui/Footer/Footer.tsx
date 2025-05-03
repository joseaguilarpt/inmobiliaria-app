import React from "react";
import "./Footer.scss";
import ContentContainer from "../ContentContainer/ContentContainer";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import GridContainer from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import Button from "../Button/Button";
import Icon, { IconType } from "../Icon/Icon";
import { useI18n } from "~/context/i18nContext";
import classNames from "classnames";

type FooterProps = {
  sections: {
    title: string;
    links: { name: string; url: string }[];
  }[];
  socialNetworks: {
    href: string;
    icon: IconType;
    label: string;
  }[];
  address: string;
  phone: string;
  email: string;
  copyright: string;
  backgroundImageUrl: string;
  className?: string;
};

const Footer: React.FC<FooterProps> = ({
  sections,
  address,
  phone,
  email,
  copyright,
  className,
  backgroundImageUrl,
  socialNetworks = [],
}) => {
  const { t } = useI18n();
  return (
    <footer
      className={classNames("footer bg-color-dark", className)}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="footer__overlay">
        <ContentContainer>
          <div className="footer__container">
            <div className="footer__section">
              <Heading appearance={6} level={6} color="accent">
                {t("pageName")}
              </Heading>
              <address className="footer__address u-pb1">
                {t(address)}
                <br />
                <strong>{t('phone')}:</strong> {t(phone)}
                <br />
                <strong>{t('email')}:</strong> {t(email)}
              </address>
              <GridContainer className="footer__buttons u-pt1">
                <GridItem>
                  <ThemeToggle />
                </GridItem>
                {socialNetworks.map((item) => (
                  <GridItem className="u-pl1" key={item.icon}>
                    <Button
                      href={item.href}
                      ariaLabel={item.label}
                      appareance="tertiary"
                    >
                      <Icon icon={item.icon} color="white" size="small" />
                    </Button>
                  </GridItem>
                ))}
              </GridContainer>
            </div>

            {sections.map((section, index) => (
              <div className="footer__section" key={index}>
                <Heading appearance={6} level={6} color="accent">
                  {t(section.title)}
                </Heading>
                <ul className="footer__links">
                  {section.links.map((link, linkIndex) => (
                    <li className="footer__link-item" key={linkIndex}>
                      <a href={t(link.url)} className="footer__link">
                        {t(link.name)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer__bottom">
            <Text align="center">{t(copyright)}</Text>
          </div>
        </ContentContainer>
      </div>
    </footer>
  );
};

export default Footer;
