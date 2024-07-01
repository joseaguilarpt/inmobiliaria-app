import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import GridContainer from "~/ui/Grid/Grid";
import GridItem from "~/ui/Grid/GridItem";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";
import Box from "~/ui/Box/Box";
import { useI18n } from "~/context/i18nContext";
import FormField, { GetInTouchForm } from "~/ui/FormField/FormField";
import { GET_IN_TOUCH_FORM } from "../../constants/getInTouchForm";
import { queryClient } from "~/root";
import { POST_DATA, postDataQuery } from "~/api/queries";
import { useTheme } from "~/context/ThemeContext";
import { useMutation } from "@tanstack/react-query";

const GetInTouchSection = () => {
  const { t } = useI18n();
  // @ts-ignore
  const params: GetInTouchForm = GET_IN_TOUCH_FORM;
  const formId = "get-in-touch-form";


  const { showSnackbar } = useTheme();
  
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return queryClient.fetchQuery(postDataQuery({ formData: data }));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [POST_DATA],
      });
      showSnackbar(t('getInTouch_form.successDescription'), "success");
    },
    onError: () => {
      showSnackbar(t('getInTouch_form.errorDescription'), "error");
    },
  });

  const handleSubmit = (p: any) => {
    mutate(p);
  };

  return (
    <ContentContainer>
      <GridContainer alignItems="center" className="u-mt3 u-mb6">
        <GridItem xs={12} lg={6} animation="slide-in-bottom">
          <Heading align="left" level={2} appearance={4} underline>
            {t("getInTouch_heading")}
          </Heading>
          <div className="u-pt2 u-pr4">
            <Text size="small" color="primary">
              {t("getInTouch_description")}
            </Text>
          </div>
        </GridItem>
        <GridItem xs={12} lg={6} animation="slide-in-bottom">
          <Box>
            <div className="u-pt2 u-pb2 u-pl5">
              <Text size="small" color="secondary" textWeight="semi-bold">
                {t("getInTouch_form.title")}
              </Text>
              <div className="u-pt1 u-pb1">
                <Text size="small">{t("getInTouch_form.description")}</Text>
                <FormField id={formId} isLoading={isPending} {...params} onSubmit={handleSubmit} />
              </div>
            </div>
          </Box>
        </GridItem>
      </GridContainer>
    </ContentContainer>
  );
};

export default GetInTouchSection;
