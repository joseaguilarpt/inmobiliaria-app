// app/components/Navbar.tsx

import { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "@remix-run/react";
import ContentContainer from "../ContentContainer/ContentContainer";
import GridContainer from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import Heading from "../Heading/Heading";
import classNames from "classnames";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import InputSelect from "../InputSelect/InputSelect";
import { useI18n } from "~/context/i18nContext";
import Sidebar from "../Sidebar/Sidebar";
import { IconType } from "react-icons";

const defaultOptions = [
  {
    value: "home",
    href: "/",
    icon: "FaHome",
  },
];

const Navbar = ({
  autoScrolled,
  items,
}: {
  autoScrolled?: boolean;
  items?: { value: string; href?: string; icon: IconType }[];
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { setLocale, locale, t } = useI18n();

  const options = items ?? defaultOptions;

  const dropdownOptions = [
    { id: 1, value: "es", label: t("spanish") },
    { id: 2, value: "en", label: t("english") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChangeLanguage = (newLocale: string) => {
    setLocale(newLocale);
  };

  const keepScrolled = autoScrolled ? true : isScrolled;

  return (
    <nav className={`navbar ${keepScrolled ? "scrolled" : ""}`}>
      <ContentContainer>
        <GridContainer alignItems="center" justifyContent="space-between">
          <GridItem>
            <Heading
              level={1}
              appearance={6}
              color={!keepScrolled ? "dark" : "default"}
            >
              {t("pageName")}
            </Heading>
          </GridItem>
          <GridContainer justifyContent="flex-end">
            <ul className="navbar__menu">
              {options.map((item) => (
                <li
                  key={item.value}
                  className={classNames(
                    "navbar__menu-item",
                    location.pathname === item.href && "--active",
                    keepScrolled && "--contrast"
                  )}
                >
                  <Link to={item.href}>{t(item.value)}</Link>
                </li>
              ))}
              <li>
                <InputSelect
                  options={dropdownOptions}
                  className={classNames(
                    "navbar__select",
                    keepScrolled && "--contrast"
                  )}
                  label="Language"
                  initialValue={locale}
                  onSelect={handleChangeLanguage}
                />
              </li>
            </ul>
            <div className="navbar__menu--mobile u-pl2">
              <Button appareance="subtle" onClick={() => setIsOpen(true)}>
                <Icon
                  icon="FaBars"
                  size="medium"
                  color={keepScrolled ? "primary" : "white"}
                />
              </Button>
            </div>
          </GridContainer>
        </GridContainer>
        <Sidebar
          items={options}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
