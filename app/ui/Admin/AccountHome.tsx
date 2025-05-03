import "./Account.scss";

import { useI18n } from "~/context/i18nContext";

import { useNavigate } from "@remix-run/react";
import Heading from "../Heading/Heading";
import GridContainer from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";
import Button from "../Button/Button";

const options = [
  {
    label: "View home page",
    icon: "FaHome",
    link: "/admin/account",
  },
  {
    label: "View all Products",
    icon: "FaList",
    link: "/admin/account/products",
  },
  {
    label: "Add new property",
    icon: "FaPlus",
    link: "/admin/account/new",
  },
];

export default function AccountHome({ onChange }: { onChange: (v: number) => void }) {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="account-home">
      <Heading appearance={6} level={3}>
        What do you want to do today?
      </Heading>
      <GridContainer className="u-pt3">
        {options.map((item, index) => (
          <GridItem key={index} xs={12} md={6} lg={4}>
            <Button onClick={() => onChange(index)} appareance="link">
              <Card className="account-home-card">
                <GridContainer
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon size="large" icon={item.icon} />
                  <Text align="center" className="u-pt3" size="large" textWeight="bold">
                    {item.label}
                  </Text>
                </GridContainer>
              </Card>
            </Button>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
