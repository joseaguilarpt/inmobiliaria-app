import React from "react";
import Button from "~/ui/Button/Button";
import Icon from "~/ui/Icon/Icon";
import "./ContactWithCall.scss";

interface ContactWithCallProps {
  phoneNumber: string;
}

const ContactWithCall: React.FC<ContactWithCallProps> = ({ phoneNumber }) => {
  const handleClick = () => {
    const callUrl = `tel:${phoneNumber}`;
    window.open(callUrl, "_self");
  };

  return (
    <div className="contact-with-call">
      <Button leftIcon="FaPhone" appareance="secondary" onClick={handleClick}>
        Call Now
      </Button>
    </div>
  );
};

export default ContactWithCall;
