interface CurrentLocationProps {
  destinationName: string;
  elapsedTime: {
    hours: number;
    minutes: number;
  };
  startPoint: { lat: number; lng: number };
}

const CurrentLocation = ({ destinationName, elapsedTime }: CurrentLocationProps) => {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-582 p-10 z-10 text-center rounded-s bg-white">
      <p>
        현재 위치에서 {destinationName}까지 {elapsedTime.hours > 0 ? `${elapsedTime.hours} 시간 ` : ''}
        {elapsedTime.minutes} 분 걸려요💨
      </p>
    </div>
  );
};

export default CurrentLocation;
