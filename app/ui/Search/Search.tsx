import "./Search.scss";

import { useI18n } from "~/context/i18nContext";
import Card from "~/ui/Card/Card";

import FormField from "~/ui/FormField/FormField";
import { useNavigate } from "@remix-run/react";
import { encodeSearch } from "~/utils/queryParamUtils";

export default function Search({ params }: { params: any }) {
  const { t } = useI18n();
  // @ts-ignore
  const formId = "get-in-touch-form";
  const navigate = useNavigate();

  const handleSubmit = (p: any) => {
    const url = encodeSearch(p);
    navigate(`/results?${url}`)
  };

  return (
    <Card className="u-mt2 search-container">
      <FormField
        className="main-form"
        id={formId}
        isLoading={false}
        {...params}
        hasSubmit
        onSubmit={handleSubmit}
        buttonClassname="submit-button"
      />
    </Card>
  );
}
