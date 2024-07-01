import { useI18n } from "~/context/i18nContext";
import { useTheme } from "~/context/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { POST_DATA, postDataQuery } from "~/api/queries";
import { queryClient } from "~/root";
import { Property } from "~/constants/mockData";
import React from "react";
import SearchResults from "~/ui/SearchResults/SearchResults";

export default function MapSection({
  properties,
}: {
  properties: Property[];
}) {
  const [isClient, setIsClient] = React.useState(false);

  const { t } = useI18n();
  const { showSnackbar } = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return queryClient.fetchQuery(postDataQuery({ formData: data }));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [POST_DATA],
      });
      showSnackbar(t("getInTouch_form.successDescription"), "success");
    },
    onError: () => {
      showSnackbar(t("getInTouch_form.errorDescription"), "error");
    },
  });

  const handleSubmit = (p: any) => {
    mutate(p);
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <SearchResults properties={properties} />;
}
