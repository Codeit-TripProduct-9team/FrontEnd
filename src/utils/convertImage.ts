export const formattedImageSource = (url: string) => {
  return url?.startsWith("'") ? url.slice(1) : url;
};
