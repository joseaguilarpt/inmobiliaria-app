import React from "react";
import SearchResults from "~/ui/SearchResults/SearchResults";

export default function ResultSection({ data }: { data: any }) {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <SearchResults data={data} />;
}
