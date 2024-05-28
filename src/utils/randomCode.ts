const randomCode = () => {
  const code = Math.floor(Math.random() * 1000000).toString();
  return code.padStart(6, '0');
};

export default randomCode;
