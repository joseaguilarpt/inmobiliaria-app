import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import { FOOTER } from "~/constants/content";
import { SEARCH_RESULTS, getSearchResultsQuery } from "~/api/queries";
import { queryClient } from "~/root";
import ResultsSection from "./ResultsPage/ResultSection";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import image from '../img/real-state.jpg';

const generateMeta = (data: any) => {
  return [
    {
      name: "title",
      content: `Real Estate Agency - Encuentra tu Propiedad ideal`,
    },
    {
      name: "description",
      content:
        "lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est",
    },
    {
      name: "keywords",
      content: [
        "real estate",
        "costa rica",
        "san jose",
        "casa",
        "apartamento",
        "garage",
        "comprar",
        "alquilar",
      ],
    },
    {
      property: "og:title",
      content: `Real Estate Agency - Encuentra tu Propiedad ideal`,
    },
    {
      property: "og:description",
      content:
        "lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est",
    },
    { property: "og:type", content: "article" },
    {
      property: "og:url",
      content: `https://cr-real-estate.netlify.app`,
    },
  ];
};

export let meta: MetaFunction = ({ data }) => {
  const { results } = data;
  return generateMeta(results);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const data: any = await queryClient.fetchQuery(
    getSearchResultsQuery({ params })
  );
  await queryClient.invalidateQueries({
    queryKey: [SEARCH_RESULTS],
  });
  return { data };
};

export default function ResultsPage() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <>
      <Navbar autoScrolled />
      <ResultsSection data={data} />
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
