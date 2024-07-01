const inputs = [
    {
      id: 'operation',
      type: "radio",
      options: [
        { id: "rent", label: "getInTouch_form.radio.option1.label" },
        { id: "buy", label: "getInTouch_form.radio.option2.label" },
      ],
      defaultSelectedOption: "rent",
      isLabelVisible: false,
      label: "getInTouch_form.radio.title",
    },
    {
      id: "name",
      label: "getInTouch_form.nameInput",
      type: "text",
      size: { xs: 12 },
      className: 'u-pt2',

      isLabelVisible: false,
      placeholder: "getInTouch_form.nameInput",
    },
    {
      id: "phone",
      label: "getInTouch_form.phoneInput",
      size: { xs: 12 },
      type: "phone",
      isLabelVisible: false,
      placeholder: "getInTouch_form.phoneInput",
    },
    {
      id: "email",
      label: "getInTouch_form.emailInput",
      type: "email",
      size: { xs: 12 },

      isLabelVisible: false,
      placeholder: "getInTouch_form.emailInput",
    },
    {
      id: "comments",
      label: "getInTouch_form.commentsInput",
      size: { xs: 12 },
      type: "area",
      isLabelVisible: false,
      placeholder: "getInTouch_form.commentsInput",
    },
  ];
  
export const GET_IN_TOUCH_FORM = {
    type: "post",
    inputs,
    hasSubmit: true,
    submitAppareance: 'primary',
    buttonLabel: "getInTouch_form.button",
  };