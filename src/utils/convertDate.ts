const convertDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns month from 0-11
  const day = date.getDate();

  return `${year}. ${month}. ${day}.`;
};

export default convertDate;
