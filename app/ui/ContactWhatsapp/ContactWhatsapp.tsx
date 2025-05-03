// app/components/ContactWhatsapp/ContactWhatsapp.tsx

import React from "react";
import Button from "~/ui/Button/Button";
import "./ContactWhatsapp.scss";
import { useI18n } from "~/context/i18nContext"; // Assuming you have an i18nContext for translation

interface ContactWithWhatsappProps {
  phoneNumber: string;
  message?: string;
}

const ContactWithWhatsapp: React.FC<ContactWithWhatsappProps> = ({
  phoneNumber,
  message,
}) => {
  const { t } = useI18n(); // Hook for accessing translations

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-numeric characters
    return phone.replace(/\D/g, "");
  };

  const handleClick = () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(
      message || "Hello!"
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="contact-with-whatsapp">
      <Button leftIcon="FaWhatsapp" appareance="primary" onClick={handleClick}>
        {t("contactWithWhatsapp.contactOnWhatsApp")}
      </Button>
    </div>
  );
};

export default ContactWithWhatsapp;
