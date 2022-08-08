export const getQueryString = (obj: object) =>
  Object.entries(obj)
    .map((entry) => entry.join("="))
    .join("&");

export default getQueryString;
