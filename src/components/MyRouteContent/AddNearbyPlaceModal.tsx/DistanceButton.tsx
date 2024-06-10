import Button from '../../common/button';

const DISTANCE = [1000, 5000, 10000];

type DistanceButtonProps = {
  selectedDistance: number;
  setSelectedDistance: React.Dispatch<React.SetStateAction<number>>;
};

const DistanceButton = ({ selectedDistance, setSelectedDistance }: DistanceButtonProps) => {
  return (
    <div className="flex gap-9 justify-center">
      {DISTANCE.map((distance) => (
        <Button
          key={distance}
          className={`w-109 h-40 bg-gray-30 ${selectedDistance === distance && 'bg-blue text-white'}`}
          onClick={() => setSelectedDistance(distance)}
        >
          {distance / 1000}km
        </Button>
      ))}
    </div>
  );
};

export default DistanceButton;
