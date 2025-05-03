import "./Account.scss";

import { useI18n } from "~/context/i18nContext";

import Heading from "../Heading/Heading";
import GridContainer from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import Button from "../Button/Button";
import products, { Property } from "../../constants/mockData";
import { ProductCard } from "../ProductCard/ProductCard";
import Modal from "../Modal/Modal";
import ContentContainer from "../ContentContainer/ContentContainer";
import { ADMIN_FILTERS } from "~/constants/adminFilters";
import FormField from "../FormField/FormField";
import React from "react";
import Pills, { PillItem } from "../Pills/Pills";
import omit from "lodash/omit";

const ActionButtons = ({ property }: { property: Property }) => {
  const handleClick = () => {};
  return (
    <GridContainer
      className="u-pt1 __card-contact"
      justifyContent="space-between"
    >
      <Button
        //onClick={() => handleClick(property.phone)}
        leftIcon="FaTrashAlt"
        appareance="link"
      >
        Delete
      </Button>
      <Button leftIcon="FaEdit" appareance="link">
        Edit
      </Button>
    </GridContainer>
  );
};

const pillItems: PillItem[] = [
  { label: "All", id: "all" },
  { label: "Completed", id: "completed" },
  { label: "Pending", id: "pending" },
];

export default function AccountProducts({}) {
  const { t } = useI18n(); // Hook for accessing translations
  const [formData, setFormData] = React.useState({});
  const [initialValue, setInitialValue] = React.useState({});
  const [filters, setFilters] = React.useState([]);

  const handleSubmit = (p: any) => {
    const params: any = Object.keys(formData).map((key) => {
      const current = ADMIN_FILTERS.inputs.find((item) => item.id === key);
      return {
        label: current?.placeholder ?? current?.label ?? "",
        id: current?.id ?? current?.placeholder ?? "",
      };
    });
    setFilters(params);
    setInitialValue(formData);
    setIsOpenModal(false);
  };

  const handleClear = () => {
    setInitialValue({});
    setFormData({});
    setFilters([]);
    setIsOpenModal(false);
  };

  const handleChange = (v: any) => {
    setFormData({ ...formData, ...v });
  };

  const handleRemoveFilter = (filter: string) => {
    setFormData(omit(formData, [filter]));
    setInitialValue(omit(formData, [filter]));
    setFilters(filters.filter((item) => item.id !== filter));
  };
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  return (
    <div className="account-home">
      <GridContainer justifyContent="space-between">
        <GridItem xs={12} md={6}>
          {" "}
          <Heading appearance={6} level={3}>
            {products.length} Products
          </Heading>
        </GridItem>
        <GridItem
          className="filters-button__wrapper"
          justifyContent="flex-end"
          xs={12}
          md={6}
        >
          <Button
            className="filters-button"
            appareance="outlined"
            size="small"
            leftIcon="FaFilter"
            onClick={() => setIsOpenModal(true)}
          >
            Filters
          </Button>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <Pills items={filters} onPillRemove={handleRemoveFilter} />
      </GridContainer>
      <GridContainer className="u-pt3">
        {products.map((item, index) => (
          <GridItem className="u-pb2 u-pr2" key={index} xs={12} md={6}>
            <ProductCard
              property={item}
              layout="vertical"
              hideButtons
              customActions={<ActionButtons property={item} />}
            />
          </GridItem>
        ))}
      </GridContainer>
      <Modal
        className="modal-filters-container"
        size="full"
        onClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
      >
        <ContentContainer>
          <FormField
            {...ADMIN_FILTERS}
            initialValue={initialValue}
            onChange={handleChange}
          />
        </ContentContainer>
        <div className="filters-actions">
          <ContentContainer>
            <GridContainer justifyContent="flex-end">
              <GridItem className="u-pr1">
                <Button appareance="link" onClick={handleClear}>
                  {t("filters.clearFilters")}
                </Button>
              </GridItem>
              <GridItem className="u-pr1">
                <Button
                  appareance="secondary"
                  onClick={() => setIsOpenModal(false)}
                >
                  {t("filters.lessFilters")}
                </Button>
              </GridItem>
              <GridItem>
                <Button onClick={handleSubmit}>{t("filters.search")}</Button>
              </GridItem>
            </GridContainer>
          </ContentContainer>
        </div>
      </Modal>
    </div>
  );
}
