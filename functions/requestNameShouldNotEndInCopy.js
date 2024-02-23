export default (item) => {
  let has2XXor3XXResponse = false;
  if (!item.name) {
    return;
  }
  const name = item.name;
  if (name.endsWith(" Copy")) {
    return [
      {
        message: `Request name "${name}" should not end in " Copy".`,
      },
    ];
  }
};
