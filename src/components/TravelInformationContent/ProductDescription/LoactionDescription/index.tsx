import Image from 'next/image';

interface PlaceDataProps {
  placeData: {
    imageSource: string;
    title: string;
    description: string;
    position?: {
      lat: number;
      lng: number;
    };
  };
}

const LocationDescription = ({ placeData }: PlaceDataProps) => {
  return (
    <>
      <Image
        className="w-full h-455 object-cover"
        width={1440}
        height={455}
        src={placeData.imageSource}
        alt="defalut"
        fetchPriority="high"
      />
      <h2 className="mt-20 text-20 font-bold">{placeData.title}</h2>
      <p className="text-center ml-284 mr-314 min-w-800">{placeData.description}</p>
    </>
  );
};

export default LocationDescription;
