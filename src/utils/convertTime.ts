const convertTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  return {
    hours: hours,
    minutes: minutes,
  };
};

export default convertTime;
