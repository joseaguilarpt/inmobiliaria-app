import React from "react";
import Button from "~/ui/Button/Button";
import Icon from "~/ui/Icon/Icon";
import "./ContactWithCall.scss";
import { useI18n } from "~/context/i18nContext";

interface ContactWithCallProps {
  phoneNumber: string;
}

const ContactWithCall: React.FC<ContactWithCallProps> = ({ phoneNumber }) => {
  const { t } = useI18n();
  const handleClick = () => {
    const callUrl = `tel:${phoneNumber}`;
    window.open(callUrl, "_self");
  };

  return (
    <div className="contact-with-call">
      <Button leftIcon="FaPhone" appareance="secondary" onClick={handleClick}>
        {t("contactCall.call")}
      </Button>
    </div>
  );
};

export default ContactWithCall;
