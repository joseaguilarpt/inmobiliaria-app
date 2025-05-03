import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import { FOOTER } from "~/constants/content";
import { getProductByIdQuery } from "~/api/queries";
import { queryClient } from "~/root";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Meta, useLoaderData } from "@remix-run/react";
import { Property } from "~/constants/mockData";
import ProductDetails from "~/ui/ProductDetails/ProductDetails";
import image from "../img/real-state.jpg";
import { useI18n } from "~/context/i18nContext";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const results: Property | Property[] = await queryClient.fetchQuery(
    getProductByIdQuery({ id: "2" })
  );
  return { results };
};

const generateMeta = (data: any) => {
  return [
    {
      name: "title",
      content: `${data.name}, to ${data.operation} in ${data.city}, ${data.country} - Real Estate Agency`,
    },
    { name: "description", content: data.description },
    {
      name: "keywords",
      content: [data.category, data.operation, data.country, data.city],
    },
    {
      property: "og:title",
      content: `${data.name}, ${data.operation} ${data.city}, ${data.country} - Real Estate Agency`,
    },
    { property: "og:description", content: data.description },
    { property: "og:type", content: "article" },
    {
      property: "og:url",
      content: `https://cr-real-estate.netlify.app/${data.operation}}/${data.id}`,
    },
    { property: "og:image", content: data.pictures[0] ?? "" },
  ];
};

export let meta: MetaFunction = ({ data }) => {
  const { results } = data;
  return generateMeta(results);
};

export default function ProductPage() {
  const { results } = useLoaderData<typeof loader>();
  const product = results;

  return (
    <>
      <Navbar autoScrolled />
      <ProductDetails product={product} />

      <BackToTop />
      <Footer
        {...FOOTER}
        backgroundImageUrl={image}
        socialNetworks={[
          { label: "Facebook", icon: "FaFacebook", href: "#" },
          { label: "Twitter", icon: "FaTwitter", href: "#" },
        ]}
      />
    </>
  );
}
