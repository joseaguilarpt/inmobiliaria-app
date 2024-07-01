import "./ProductDetails.scss";

import { Property } from "~/constants/mockData";
import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import Breadcrumb from "~/ui/Breadcrumbs/Breadcrumbs";
import ImageSlider from "~/ui/ImageSlider/ImageSlider";
import GridContainer from "~/ui/Grid/Grid";
import GridItem from "~/ui/Grid/GridItem";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";
import Divider from "../Divider/Divider";
import MapWithLocations from "../Map/Map.client";
import React from "react";
import Box from "../Box/Box";
import FormField, { GetInTouchForm } from "../FormField/FormField";
import { GET_IN_TOUCH_FORM } from "~/constants/getInTouchForm";
import ContactWithCall from "../ContactCall/ContactCall";
import ContactWithWhatsapp from "../ContactWhatsapp/ContactWhatsapp";

export default function ProductDetails({ product }: { product: Property }) {
  const [isClient, setIsClient] = React.useState(false);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    {
      label: product.operation,
      href: `/results?operation=${product.operation}`,
    },
    {
      label: product.category,
      href: `/results?operation=${product.operation}&category=${product.category}`,
    },
    {
      label: product.city,
      href: `/results?${product.operation}&category=${product.category}&location=${product.city}`,
    },
    { label: product.name },
  ];

  const details = [
    [
      { label: "Area:", icon: "FaMap", value: product.area },
      { label: "Rooms:", icon: "FaMoon", value: product.rooms },
    ],
    [
      { label: "Bathrooms:", icon: "FaSun", value: 3 },
      { label: "Type of Property:", icon: "FaSearch", value: product.category },
    ],
    [{ label: "Operation:", icon: "FaTimes", value: product.operation }],
  ];

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const params: GetInTouchForm = GET_IN_TOUCH_FORM;
  const formId = "get-in-touch-form";

  let mapParams: any  = {}
  if (product.lat && product.lon) {
    mapParams.initialCoords = {
      lat: product.lat,
      lon: product.lon,
    }
  }
  return (
    <div className="product-details">
      <ContentContainer className="bg-color-secondary">
        <div className="breadcrumbs-container">
          <Breadcrumb paths={breadcrumbs} />
        </div>
      </ContentContainer>
      <ContentContainer>
        <GridContainer>
          <GridItem xs={12} md={8}>
            {product.pictures && <ImageSlider images={product.pictures ?? []} />}
            <GridContainer className="u-pt2" justifyContent="space-between">
              <GridItem xs={12} md={8}>
                <Heading level={1} appearance={6}>
                  {product.name}
                </Heading>
                <GridContainer className="product-details__buttons">
                  <GridItem>
                    <Button appareance="outlined">
                      <Icon icon="FaPhotoVideo" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button appareance="outlined">
                      <Icon icon="FaDirections" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button appareance="outlined">
                      <Icon icon="FaFaucet" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button appareance="outlined">
                      <Icon icon="FaMap" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  className="product-details__direction"
                  alignItems="baseline"
                >
                  <Text className="u-pt2">{product.address}</Text>
                  <Button appareance="link" leftIcon="FaMapPin">
                    View Map
                  </Button>
                </GridContainer>
                <GridContainer>
                  <Text>Area: {product.area} m2</Text>
                  <Text className="u-pl2 u-pr2">|</Text>
                  <Text>Rooms: {product.rooms}</Text>
                  <Text className="u-pl2 u-pr2">|</Text>
                  <Text>Bathrooms: 2</Text>
                </GridContainer>
              </GridItem>
              <GridItem>
                <Heading appearance={6} level={5}>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "usd",
                  }).format(product.price)}
                </Heading>
              </GridItem>
            </GridContainer>
            <GridContainer className="u-pt4">
              <GridItem xs={12}>
                <Heading level={4} appearance={6}>
                  Description
                </Heading>
                <div className="u-pt1 u-pb2">
                  <Divider />
                </div>
                <Text>
                  {product.description} ;Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quos quaerat, nesciunt ipsum odio quam iusto
                  temporibus illum voluptates placeat. Temporibus explicabo ut
                  eius! Officia, accusantium. Fugiat non incidunt quos atque.
                </Text>
              </GridItem>
            </GridContainer>
            <GridContainer className="u-pt4">
              <GridItem xs={12}>
                <Heading level={4} appearance={6}>
                  Property Details
                </Heading>
                <div className="u-pt1 u-pb2">
                  <Divider />
                </div>
                {details?.map((row, index) => (
                  <div key={`${index}-details`}>
                    <GridContainer>
                      {row.map((item) => (
                        <GridItem
                          key={`${item.value}-${item.label}`}
                          md={6}
                          xs={12}
                        >
                          <GridContainer justifyContent="space-between">
                            <GridItem xs={5}>
                              <Text textWeight="bold">
                                <span className="u-pr2">
                                  <Icon icon={item.icon} size="small" />
                                </span>
                                {item.label}
                              </Text>
                            </GridItem>
                            <GridItem xs={5}>
                              <Text>{item.value}</Text>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      ))}
                    </GridContainer>
                    <div className="u-pt1 u-pb2">
                      <Divider />
                    </div>
                  </div>
                ))}
              </GridItem>
            </GridContainer>
            <GridContainer className="u-pt4">
              <GridItem xs={12}>
                <Heading level={4} appearance={6}>
                  Property Amenities
                </Heading>
                <div className="u-pt1 u-pb1">
                  <Divider />
                </div>
                <ul>
                  {product?.amenities?.map((item) => (
                    <li className="u-pb2" key={item}>
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
              </GridItem>
            </GridContainer>
            <GridContainer className="u-pt1">
              <GridItem xs={12}>
                <Heading level={4} appearance={6}>
                  Map
                </Heading>
                <div className="u-pt1 u-pb1">
                  <Divider />
                </div>
                {Boolean(product) && isClient && (
                  <div className="u-pt2 map-container">
                    <MapWithLocations
                      locations={[product]}
                      {...mapParams}
                    />
                  </div>
                )}
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem className="u-pl4" xs={12} md={4}>
            <Box className="product-details__contact">
              <div>
                <Text className="u-pb3">
                  You can contact the advertiser through:
                </Text>
                <GridContainer>
                  <GridItem className="u-pb2" xs={12}>
                    <ContactWithCall phoneNumber={product.phone} />
                  </GridItem>
                  <GridItem xs={12}>
                    <ContactWithWhatsapp
                      phoneNumber={product.phone}
                      message="Hi, I would like to know more about your services."
                    />
                  </GridItem>
                </GridContainer>
              </div>
              <Text className="u-pt3">Or send an email:</Text>

              <FormField
                id={formId}
                isLoading={false}
                {...params}
                inputs={params.inputs.slice(1)}
                onSubmit={() => {}}
              />
            </Box>
          </GridItem>
        </GridContainer>
      </ContentContainer>
    </div>
  );
}
