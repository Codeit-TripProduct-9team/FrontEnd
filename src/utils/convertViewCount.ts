const convertViewCount = (viewCount: number) => {
  if (viewCount >= 10_000) {
    return (viewCount / 10_000).toFixed(0) + '만';
  }
  if (viewCount < 10_000) {
    return viewCount.toLocaleString();
  }
};

export default convertViewCount;
