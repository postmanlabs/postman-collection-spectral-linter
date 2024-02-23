function hasPathVariable(url) {
  //return true in case the URL contains variables in the path like {{variable}} or :variable

  for (let path of url.path) {
    if (path.includes("{{") || path.includes(":")) {
      return true;
    }
  }
  return false;
}

export default (item) => {
  let has404Response = false;
  const errors = [
    {
      message: "Requests with path variables require a 404 response.",
    },
  ];
  if (
    !item.request ||
    (item.request.url && !hasPathVariable(item.request.url))
  ) {
    return;
  }
  for (let response of item.response) {
    if (response.code === 404) {
      has404Response = true;
      break;
    }
  }
  if (!has404Response) {
    return errors;
  }
};
