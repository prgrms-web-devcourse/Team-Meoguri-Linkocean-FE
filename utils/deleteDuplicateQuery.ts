export const deleteDuplicateQuery = (query: string, keyword: string) => {
  const queryArr = query.split("&");
  let result = "";
  queryArr.forEach((element) => {
    const queryElements = element.split("=");
    if (queryElements[0] !== keyword) {
      if (element.length !== 0) {
        result += `${element}&`;
      }
    }
  });
  return result;
};

export default deleteDuplicateQuery;
