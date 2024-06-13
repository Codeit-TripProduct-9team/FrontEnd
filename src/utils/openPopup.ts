const openPopup = (url: string) => {
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
};

export default openPopup;
