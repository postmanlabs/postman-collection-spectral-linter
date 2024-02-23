export default (response) => {
  const errors = [
    {
      message: "Delete response should have 200 or 204 code.",
    },
  ];
  if (
    response.originalRequest.method === "DELETE" &&
    response.code !== 200 &&
    response.code !== 204
  ) {
    return errors;
  }
};
