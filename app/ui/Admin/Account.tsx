import "./Account.scss";

import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import GridContainer from "~/ui/Grid/Grid";
import GridItem from "~/ui/Grid/GridItem";
import { useI18n } from "~/context/i18nContext";

import { useTheme } from "~/context/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { POST_DATA, postDataQuery } from "~/api/queries";
import { useNavigate } from "@remix-run/react";
import Icon from "~/ui/Icon/Icon";
import VerticalNav, { VerticalNavItem } from "~/ui/VerticalNav/VerticalNav";
import Breadcrumb from "~/ui/Breadcrumbs/Breadcrumbs";
import Heading from "../Heading/Heading";
import React from "react";
import AccountHome from "./AccountHome";
import AccountProducts from "./AccountProducts";

export default function Account() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = React.useState(0)
  const { showSnackbar } = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return queryClient.fetchQuery(postDataQuery({ formData: data }));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [POST_DATA],
      });
      showSnackbar(t("getInTouch.successDescription"), "success");
      setTimeout(() => {
        navigate("/admin/account");
      }, 1000);
    },
    onError: () => {
      showSnackbar(t("getInTouch.errorDescription"), "error");
    },
  });

  const navItems: VerticalNavItem[] = [
    { label: 'Home', link: 'account', icon: <Icon icon='FaHome' /> },
    { label: 'Products', link: 'products', icon: <Icon icon='FaList'/> },
    { label: 'New Product', link: 'new', icon: <Icon icon='FaPlus'/>  }
  ];

  const handleItemSelect = (index: number) => {
    setActiveIndex(index)
    if (index === 2) {
      //navigate(navItems[index].link)
    }
  };


  return (
    <div className="admin-account">
      <ContentContainer className="bg-color-secondary">
        <div className="breadcrumbs-container">
          <Heading appearance={6} level={1}>
            {" "}
            ADMIN PAGE: HOME
          </Heading>
          <Breadcrumb paths={[{ label: t("home") }]} />
        </div>
      </ContentContainer>
      <ContentContainer>
        <GridContainer
          className="full-screen-height"
          justifyContent="space-between"
        >
          <GridItem xs={12} lg={3}>
            <VerticalNav
              items={navItems}
              defaultActiveIndex={activeIndex}
              onItemSelect={handleItemSelect}
            />
          </GridItem>
          <GridItem xs={12} md={9}>
            {activeIndex === 0 && <AccountHome onChange={handleItemSelect} />}
            {activeIndex === 1 && <AccountProducts />}
          </GridItem>
        </GridContainer>
      </ContentContainer>
    </div>
  );
}
