export default (item) => {
  let has401Response = false;
  if (
    !item.request ||
    !item.request.auth ||
    item.request.auth.type === "noauth"
  ) {
    return;
  }
  for (let response of item.response) {
    if (response.code === 401) {
      has401Response = true;
      break;
    }
  }
  if (!has401Response) {
    return [
      {
        message: `Request "${item.name}" with authentication requires a 401 response.`,
      },
    ];
  }
};
