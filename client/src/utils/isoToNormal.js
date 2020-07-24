export default (date) => {
  //if (isNaN(date)) return;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const normalDate = new Date(date);
  return normalDate.toLocaleDateString('tr-TR', options);
};
