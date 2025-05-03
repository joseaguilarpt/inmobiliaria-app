import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import { FOOTER } from "~/constants/content";
import { getProductByIdQuery } from "~/api/queries";
import { queryClient } from "~/root";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Property } from "~/constants/mockData";
import ProductDetails from "~/ui/ProductDetails/ProductDetails";
import image from '../img/hero-carousel/hero-carousel-3.jpg';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const results: Property | Property[] = await queryClient.fetchQuery(
    getProductByIdQuery({ id: '2' })
  );
  return { results };
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
