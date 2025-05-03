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
import { useI18n } from "~/context/i18nContext"; // Assuming you have an i18nContext for translation
import { useNavigate } from "@remix-run/react";
import Modal from "../Modal/Modal";
import ThumbnailSlider from "../ThumbnailSlider/ThumbnailSlider";
import Sidebar from "../Sidebar/Sidebar";

export default function ProductDetails({ product }: { product: Property }) {
  const { t } = useI18n(); // Hook for accessing translations
  const [isClient, setIsClient] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [isOpenPictures, setOpenPictures] = React.useState(false);
  const [isCallFormOpen, setIsCallFormOpen] = React.useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = React.useState(false);

  console.log(product, 'product')
  const navigate = useNavigate();
  const breadcrumbs = [
    { label: t("home"), href: "/" },
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
      href: `/results?operation=${product.operation}&category=${product.category}&location=${product.city}`,
    },
    { label: product.name },
  ];

  const details = [
    [
      { label: t("productDetails.area"), icon: "FaMap", value: product.area },
      {
        label: t("productDetails.rooms"),
        icon: "FaMoon",
        value: product.rooms,
      },
    ],
    [
      { label: t("productDetails.bathrooms"), icon: "FaSun", value: 3 },
      {
        label: t("productDetails.operation"),
        icon: "FaSearch",
        value: product.category,
      },
    ],
    [
      {
        label: t("productDetails.operation"),
        icon: "FaTimes",
        value: product.operation,
      },
    ],
  ];

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const params: GetInTouchForm = GET_IN_TOUCH_FORM;
  const formId = "get-in-touch-form";

  let mapParams: any = {};
  if (product.lat && product.lng) {
    mapParams.initialCoords = {
      lat: product.lat,
      lng: product.lng,
    };
  }

  const handleImageSelect = (v: number) => {
    setSelectedImage(v);
  };

  const handleOpenPicturesModal = (v: number) => {
    setSelectedImage(v);
    setOpenPictures(true);
  };

  const pictures = product.pictures ?? [];

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
            {product.pictures && (
              <div className="product-details__pictures">
                <div>
                  <ImageSlider
                    initialValue={selectedImage}
                    onTotalClick={handleOpenPicturesModal}
                    onSelectSlider={handleOpenPicturesModal}
                    showTotal
                    images={pictures}
                  />
                </div>
                <ThumbnailSlider
                  onSelect={handleImageSelect}
                  images={pictures}
                />
              </div>
            )}
            <GridContainer className="u-pt1" justifyContent="space-between">
              <GridItem xs={12} md={8}>
                <Heading level={1} appearance={6}>
                  {product.name}
                </Heading>
                <GridContainer className="product-details__buttons">
                  <GridItem>
                    <Button
                      onClick={() => setOpenPictures(true)}
                      appareance="outlined"
                      ariaLabel={t("productDetails.photos")}
                    >
                      <Icon icon="FaPhotoVideo" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button
                      onClick={() => navigate("#amenities")}
                      appareance="outlined"
                      ariaLabel={t("productDetails.propertyAmenities")}
                    >
                      <Icon icon="FaInfoCircle" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button
                      ariaLabel={t("productDetails.propertyDetails")}
                      onClick={() => navigate("#details")}
                      appareance="outlined"
                    >
                      <Icon icon="FaFaucet" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button
                      onClick={() => navigate("#map")}
                      ariaLabel={t("productDetails.map")}
                      appareance="outlined"
                    >
                      <Icon icon="FaMap" size="medium" color="primary" />
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  className="product-details__direction"
                  alignItems="baseline"
                >
                  <Text className="u-pt2">{product.address}</Text>
                  <Button
                    onClick={() => navigate("#map")}
                    appareance="link"
                    leftIcon="FaMapPin"
                    ariaLabel={t("productDetails.map")}
                  >
                    {t("productDetails.viewMap")}
                  </Button>
                </GridContainer>
                <GridContainer>
                  <Text>
                    {t("productDetails.area")}: {product.area} m2
                  </Text>
                  <Text className="u-pl2 u-pr2">|</Text>
                  <Text>
                    {t("productDetails.rooms")}: {product.rooms}
                  </Text>
                  <Text className="u-pl2 u-pr2">|</Text>
                  <Text>{t("productDetails.bathrooms")}: 2</Text>
                </GridContainer>
              </GridItem>
              <GridItem>
                <Heading appearance={6} level={5}>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </Heading>
              </GridItem>
            </GridContainer>
            <GridContainer className="u-pt4">
              <GridItem xs={12}>
                <Heading level={4} appearance={6}>
                  {t("productDetails.description")}
                </Heading>
                <div className="u-pt1 u-pb2">
                  <Divider />
                </div>
                <Text>{product.description}</Text>
              </GridItem>
            </GridContainer>
            <GridContainer className="u-pt4">
              <GridItem id="details" xs={12}>
                <Heading level={4} appearance={6}>
                  {t("productDetails.propertyDetails")}
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
              <GridItem id="amenities" xs={12}>
                <Heading level={4} appearance={6}>
                  {t("productDetails.propertyAmenities")}
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
                  {t("productDetails.map")}
                </Heading>
                <div className="u-pt1 u-pb1">
                  <Divider />
                </div>
                {Boolean(product) && isClient && (
                  <div id="map" className="u-pt2 map-container">
                    <MapWithLocations locations={[product]} {...mapParams} />
                  </div>
                )}
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem className="" xs={12} md={4}>
            <Box className="product-details__contact">
              <div>
                <GridContainer className="u-pt5 u-mb3">
                  <GridItem xs={2}>
                    <Icon size="large" color="secondary" icon="FaUserCircle" />
                  </GridItem>
                  <GridItem xs={10}>
                    <Text size="large" textWeight="bold">
                      Contacta al anunciante:
                    </Text>
                    <Text>{product.updated_by}</Text>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem className="u-pb2" xs={12}>
                    <ContactWithCall phoneNumber={product.phone} />
                  </GridItem>
                  <GridItem xs={12}>
                    <ContactWithWhatsapp
                      phoneNumber={product.phone}
                      message={t("productDetails.defaultMessage")}
                    />
                  </GridItem>
                </GridContainer>
              </div>
              <Text className="u-pt3">{t("productDetails.sendEmail")}</Text>

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
        <Modal
          className="pictures-modal"
          size="full"
          isOpen={isOpenPictures}
          onClose={() => setOpenPictures(false)}
        >
          <>
            <ImageSlider initialValue={selectedImage} images={pictures} />
            <ThumbnailSlider onSelect={handleImageSelect} images={pictures} />
          </>
        </Modal>
      </ContentContainer>
      <div className="product-details__mobile">
        <ContentContainer>
          <GridContainer justifyContent="space-between">
            <GridItem className="u-pr1" xs={6}>
              <Button
                onClick={() => setIsContactFormOpen(true)}
                appareance="outlined"
                leftIcon="FaVoicemail"
                fitContainer
              >
                Enviar Email
              </Button>
            </GridItem>
            <GridItem className="u-pl1" xs={6}>
              <Button
                onClick={() => setIsCallFormOpen(true)}
                leftIcon="FaWhatsapp"
                fitContainer
              >
                Llamar / Escribir
              </Button>
            </GridItem>
          </GridContainer>
        </ContentContainer>
      </div>
      <Sidebar
        className="product-details__contact-mobile"
        isOpen={isContactFormOpen}
        position="bottom"
        onClose={() => setIsContactFormOpen(false)}
      >
        <ContentContainer>
          <Button
            className="__close"
            appareance="link"
            size="small"
            ariaLabel="Close contact form"
            onClick={() => setIsContactFormOpen(false)}
          >
            <Icon icon="FaTimes" />
          </Button>
          <GridContainer className="u-pt5">
            <GridItem xs={2}>
              <Icon size="large" color="secondary" icon="FaUserCircle" />
            </GridItem>
            <GridItem xs={8}>
              <Text size="large" textWeight="bold">
                Contacta al anunciante:
              </Text>
              <Text>{product.updated_by}</Text>
            </GridItem>
          </GridContainer>
          <FormField
            id={formId}
            isLoading={false}
            {...params}
            inputs={params.inputs.slice(1)}
            onSubmit={() => {}}
          />
        </ContentContainer>
      </Sidebar>
      <Sidebar
        className="product-details__contact-mobile"
        isOpen={isCallFormOpen}
        position="bottom"
        onClose={() => setIsCallFormOpen(false)}
      >
        <ContentContainer>
          <Button
            className="__close"
            appareance="link"
            size="small"
            ariaLabel="Close contact form"
            onClick={() => setIsCallFormOpen(false)}
          >
            <Icon icon="FaTimes" />
          </Button>
          <GridContainer className="u-pt5">
            <GridItem xs={2}>
              <Icon size="large" color="secondary" icon="FaUserCircle" />
            </GridItem>
            <GridItem xs={8}>
              <Text size="large" textWeight="bold">
                Contacta al anunciante:
              </Text>
              <Text>{product.updated_by}</Text>
            </GridItem>
          </GridContainer>
          <GridContainer className="u-mb6 u-pt3">
            <GridItem className="u-pb2" xs={12}>
              <ContactWithCall phoneNumber={product.phone} />
            </GridItem>
            <GridItem xs={12}>
              <ContactWithWhatsapp
                phoneNumber={product.phone}
                message={t("productDetails.defaultMessage")}
              />
            </GridItem>
          </GridContainer>
        </ContentContainer>
      </Sidebar>
    </div>
  );
}
