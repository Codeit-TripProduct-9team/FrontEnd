import Button from '../../common/button';

const DISTANCE = [1000, 5000, 10000];

type DistanceButtonProps = {
  selectedDistance: number;
  setSelectedDistance: React.Dispatch<React.SetStateAction<number>>;
};

const DistanceButton = ({ selectedDistance, setSelectedDistance }: DistanceButtonProps) => {
  return (
    <div className="flex flex-col justify-center absolute right-20 rounded-s overflow-hidden">
      {DISTANCE.map((distance) => (
        <Button
          key={distance}
          className={`w-63 h-33 border-b-1 last:border-none bg-gray-30 rounded-0 ${
            selectedDistance === distance && 'bg-blue '
          }`}
          onClick={() => setSelectedDistance(distance)}
        >
          {distance / 1000}km
        </Button>
      ))}
    </div>
  );
};

export default DistanceButton;
