import "./Filters.scss";
import React from "react";
import FormField from "../FormField/FormField";
import { FILTERS } from "~/constants/filters";
import Button from "../Button/Button";
import GridContainer from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import Modal from "../Modal/Modal";
import ContentContainer from "../ContentContainer/ContentContainer";
import { encodeSearch, parseQueryParams } from "~/utils/queryParamUtils";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useI18n } from "~/context/i18nContext"; // Assuming you have an i18nContext for translation

export default function Filters() {
  const { t } = useI18n(); // Hook for accessing translations
  const [formData, setFormData] = React.useState({});
  const [searchParams] = useSearchParams();
  const [initialValue, setInitialValue] = React.useState({});
  const queryParams: any = parseQueryParams(searchParams);

  function initialize() {
    let params = { location: {} };
    Object.entries(queryParams).forEach(([key, value]) => {
      if (key === "location") {
        params.location = { ...params.location, display_name: value };
      } else if (key === "lon") {
        params.location = { ...params.location, lon: value };
      } else if (key === "lat") {
        params.location = { ...params.location, lat: value };
      } else {
        params = { ...params, [key]: value };
      }
    });
    setInitialValue(params);
  }

  React.useEffect(() => {
    initialize();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const url = encodeSearch(formData);
    setIsOpenModal(false);
    navigate(`/results?${url}`);
  };

  const handleClear = () => {
    setInitialValue({});
    setFormData({});
    navigate(`/results?operation=rent`);
  };

  const handleChange = (v: any) => {
    setFormData({ ...formData, ...v });
  };

  const [isOpenModal, setIsOpenModal] = React.useState(false);

  return (
    <div className="filters-container">
      <FormField
        {...FILTERS}
        inputs={FILTERS.inputs.slice(0, 7)}
        initialValue={initialValue}
        onChange={handleChange}
      />
      <GridContainer justifyContent="flex-end">
        <GridItem>
          <Button appareance="link" onClick={handleClear}>
            {t("filters.clearFilters")}
          </Button>
        </GridItem>
        <GridItem>
          <Button appareance="secondary" onClick={() => setIsOpenModal(true)}>
            {t("filters.moreFilters")}
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={handleSubmit}>{t("filters.search")}</Button>
        </GridItem>
      </GridContainer>
      <Modal
        className="modal-filters-container"
        size="full"
        onClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
      >
        <ContentContainer>
          <FormField {...FILTERS} initialValue={initialValue} onChange={handleChange} />
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
                <Button appareance="secondary" onClick={() => setIsOpenModal(false)}>
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
