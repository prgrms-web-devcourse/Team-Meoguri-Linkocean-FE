const dateFormat = (getDate: string) => {
  const date = new Date(getDate);
  const y = date.getFullYear();
  let m = date.getMonth().toString();
  let d = date.getDate().toString();

  if (Number(m) < 10) {
    m = `0${m}`;
  }
  if (Number(d) < 10) {
    d = `0${d}`;
  }

  return `${y}-${m}-${d}`;
};

export default dateFormat;
