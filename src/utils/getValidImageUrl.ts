const getValidImageUrl = (url: string) => {
  const sanitizedUrl = url.replace(/['"]/g, '');
  try {
    const parsedUrl = new URL(sanitizedUrl);
    return parsedUrl.href;
  } catch (e) {
    return '';
  }
};

export default getValidImageUrl;
