import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import { FOOTER } from "~/constants/content";
import { SEARCH_RESULTS, getSearchResultsQuery } from "~/api/queries";
import { queryClient } from "~/root";
import ResultsSection from "./ResultsPage/ResultSection";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Property } from "~/constants/mockData";
import image from '../img/hero-carousel/hero-carousel-3.jpg';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const results: Property[] = await queryClient.fetchQuery(
    getSearchResultsQuery({ params })
  );
  await queryClient.invalidateQueries({
    queryKey: [SEARCH_RESULTS],
  });
  return { results };
};

export default function ResultsPage() {
  const { results } = useLoaderData<typeof loader>();
  return (
    <>
      <Navbar autoScrolled />
      <ResultsSection properties={results} />
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
