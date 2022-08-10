export const deleteDuplicateQuery = (query: string, keyword: string) => {
  const queryArr = query.split("&");
  let result = "";
  queryArr.forEach((element) => {
    const temp = element.split("=");
    if (temp[0] !== keyword) {
      result += element;
    }
  });
  return result;
};

export default deleteDuplicateQuery;
