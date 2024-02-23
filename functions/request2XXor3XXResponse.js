export default (item) => {
  let has2XXor3XXResponse = false;
  const errors = [
    {
      message: "Item has request but no responses.",
    },
  ];
  if (!item.request) {
    return;
  }
  for (let response of item.response) {
    if (response.code >= 200 && response.code < 400) {
      has2XXor3XXResponse = true;
      break;
    }
  }
  if (!has2XXor3XXResponse) {
    return errors;
  }
};
