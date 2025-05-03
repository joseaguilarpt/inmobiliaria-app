import "./SearchResults.scss";
import React from "react";
import Button from "~/ui/Button/Button";
import ContentContainer from "../ContentContainer/ContentContainer";
import GridContainer from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import Breadcrumb from "../Breadcrumbs/Breadcrumbs";
import Filters from "../Filters/Filters";
import Image from "../Image/Image";
import Heading from "../Heading/Heading";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { encodeSearch, parseQueryParams } from "~/utils/queryParamUtils";
import Text from "../Text/Text";
import { ProductCard } from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import MapWithLocations from "~/ui/Map/Map.client";
import { useI18n } from "~/context/i18nContext"; // Assuming you have an i18nContext for translation
import mapImage from "../../img/map-layer.jpg";
import InputSelect from "../InputSelect/InputSelect";
import omit from "lodash/omit";

export default function SearchResults({ data }: { data: any }) {
  const { t } = useI18n(); // Hook for accessing translations
  const [isMapScreen, setMapScreen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const queryParams: Record<string, string> = parseQueryParams(searchParams);
  let operationType = !queryParams.operation
    ? t(`searchResults.propertiesTorentOrBuy`)
    : t(`searchResults.propertiesTo${queryParams.operation}`);

  const locationType = queryParams.location ?? "";
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({});
  const [initialValue, setInitialValue] = React.useState({});

  function initialize() {
    let params = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      if (key === "location") {
        params.location = { ...params.location, display_name: value };
      } else if (key === "lng") {
        params.location = { ...params.location, lng: value };
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

  const handleSort = (p: any) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("sort");
    updatedParams.append("sort", p);
    updatedParams.delete("page");
    const url = updatedParams.toString();
    navigate(`/results?${url}`);
  };

  const handlePageChange = (p: number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("page");
    updatedParams.append("page", String(p));
    const url = updatedParams.toString();
    navigate(`/results?${url}`);
  };

  const handleSubmit = (p: any) => {
    const url = encodeSearch(formData, true);
    navigate(`/results?${url}`);
  };

  const handleClear = () => {
    setInitialValue({});
    setFormData({});
    navigate(`/results`);
  };

  const handleChange = (v: any) => {
    setFormData({ ...formData, ...v });
  };

  const handleRemoveFilter = (filter: string) => {
    const updated = omit(formData, [filter]);
    setFormData(updated);
    const url = encodeSearch(updated, true);
    navigate(`/results?${url}`);
  };

  const properties = data?.results ?? [];

  const initialProduct = data.size * data.page - data.size;
  const finalProduct = data.size * data.page;
  return (
    <div className="search-results">
      {!isMapScreen && (
        <>
          <ContentContainer className="bg-color-secondary">
            <Breadcrumb
              paths={[
                { label: t("home"), href: "/" },
                { label: t("searchResults.results") },
              ]}
            />
            <div>
              <Filters
                onClear={handleClear}
                onFormDataChange={handleChange}
                onSubmit={handleSubmit}
                formData={formData}
                onRemoveFilter={handleRemoveFilter}
                initialValue={initialValue}
                onToggleMap={() => setMapScreen(true)}
                isMapOpen={isMapScreen}
              />
            </div>
          </ContentContainer>
          <ContentContainer>
            <GridContainer>
              <GridItem className="search-results__map--desktop" xs={12} lg={3}>
                <div className="search-results__map-trigger u-pt2">
                  <Image alt="Open Map" src={mapImage} />

                  <Button
                    onClick={() => setMapScreen(true)}
                    appareance="secondary"
                  >
                    {t("filters.viewMap")}
                  </Button>
                </div>
              </GridItem>
              <GridItem className="search-results__list" xs={12} lg={9}>
                <GridContainer justifyContent="space-between">
                  <GridItem xs={12} md={7}>
                    <Heading appearance={6} level={2}>
                      {operationType}{" "}
                      {locationType ? ` ${locationType}` : ""}
                    </Heading>
                    <Text>
                      {initialProduct === 0 ? 1 : initialProduct} -{" "}
                      {finalProduct > data.total ? data.total : finalProduct}{" "}
                      {t("searchResults.of")} {data.total}{" "}
                      {t("searchResults.results")}
                    </Text>
                  </GridItem>
                  <GridItem className="u-pt2" xs={12} md={4}>
                    <InputSelect
                      placeholder={t("filters.sort")}
                      onSelect={handleSort}
                      label={t("filters.sort")}
                      initialValue={queryParams?.sort}
                      options={[
                        { label: t("sort1.label"), value: "price-asc", id: 0 },
                        { label: t("sort2.label"), value: "relevant", id: 1 },
                        { label: t("sort3.label"), value: "newest", id: 2 },
                        { label: t("sort4.label"), value: "smallest", id: 3 },
                        { label: t("sort5.label"), value: "biggest", id: 4 },
                      ]}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer
                  justifyContent="flex-end"
                  className="u-mt4 u-mb4"
                >
                  {properties.map((item) => (
                    <GridItem key={item.id} xs={12} className="u-mb2">
                      <ProductCard layout="horizontal" property={item} />
                    </GridItem>
                  ))}
                  <Pagination
                    totalPages={Math.ceil(data.total / data.size)}
                    currentPage={data.page}
                    onPageChange={handlePageChange}
                  />
                </GridContainer>
              </GridItem>
            </GridContainer>
          </ContentContainer>
        </>
      )}
      {isMapScreen && (
        <>
          <ContentContainer className="bg-color-secondary">
            <Breadcrumb
              paths={[
                { label: t("home"), href: "/" },
                { label: t("searchResults.results") },
              ]}
            />
            <div>
              <Filters
                onClear={handleClear}
                onFormDataChange={handleChange}
                onSubmit={handleSubmit}
                formData={formData}
                onRemoveFilter={handleRemoveFilter}
                initialValue={initialValue}
                onToggleMap={() => setMapScreen(false)}
                isMapOpen={isMapScreen}
              />
            </div>
          </ContentContainer>
          <div className="search-results__map-container">
            <MapWithLocations locations={properties} />
            <div className="back-to-list__wrapper">
              <Button
                onClick={() => setMapScreen(false)}
                leftIcon="FaList"
                className="toggle-map"
                appareance="secondary"
              >
                {t("filters.backToList")}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
