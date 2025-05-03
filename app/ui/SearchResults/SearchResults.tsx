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
import { useSearchParams } from "@remix-run/react";
import { parseQueryParams } from "~/utils/queryParamUtils";
import Text from "../Text/Text";
import { ProductCard } from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import MapWithLocations from "~/ui/Map/Map.client";
import { useI18n } from "~/context/i18nContext"; // Assuming you have an i18nContext for translation
import { Property } from "~/constants/mockData";
import mapImage from '../../img/map-layer.jpg';

export default function SearchResults({
  properties,
}: {
  properties: Property[];
}) {
  const { t } = useI18n(); // Hook for accessing translations
  const [isMapScreen, setMapScreen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const queryParams: Record<string, string> = parseQueryParams(searchParams);

  const operationType = queryParams.operation === "buy" ? "buy" : "rent";
  const locationType = queryParams.location ?? "";
  const resultCount = properties.length;

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
              <Filters />
            </div>
          </ContentContainer>
          <ContentContainer>
            <GridContainer>
              <GridItem xs={12} lg={3}>
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
                  <GridItem xs={12}>
                    <Heading appearance={6} level={2}>
                      {t(`searchResults.propertiesTo${operationType}`)}{" "}
                      {locationType ? ` ${locationType}` : ""}
                    </Heading>
                    <Text>
                      {properties.length}{" "}
                      {t("searchResults.of")} 100 {t("searchResults.results")}
                    </Text>
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
                    totalPages={Math.ceil(100 / 10)}
                    currentPage={1}
                    onPageChange={() => {}}
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
              <Filters />
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
