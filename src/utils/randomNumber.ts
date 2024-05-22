export const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000000).toString();
  return randomNumber.padStart(6, '0');
};
