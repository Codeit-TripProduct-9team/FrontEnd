import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import instance from '@/src/api/axios';

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

const NEXT_PUBLICI_TOUR_API =
  'IMbzpjmbSpLVZUys8Q4cyr5p%2BYkPE6V%2FAOZN2SP2UQlssQex1BghFT%2FT87MDUOG0Cf6571Zbm7ZuhHl8rtVcvw%3D%3D';
const TOUR_API = 'http://apis.data.go.kr/B551011/KorService1';

const LocationDescription = ({ placeData }: PlaceDataProps) => {
  const [imageList, setImageList] = useState<string[]>([]);

  const getLocationInformation = useCallback(async () => {
    try {
      const response = await instance.get(
        `${TOUR_API}/locationBasedList1?serviceKey=${NEXT_PUBLICI_TOUR_API}&_type=json&mapX=${placeData.position?.lng}&mapY=${placeData.position?.lat}&MobileOS=WIN&MobileApp=Utrip&radius=10000&numOfRows=20`,
      );
      const result = await response.data;
      const itemList = result.response.body.items.item;
      const ImageList = itemList.map((item: any) => item.firstimage);
      setImageList(ImageList);
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }, [placeData.position?.lat, placeData.position?.lng]);

  useEffect(() => {
    if (placeData.position) {
      getLocationInformation();
    }
  }, [getLocationInformation, placeData.position]);

  return (
    <>
      {imageList.length < 0 ? (
        imageList.map(
          (image, index) =>
            image && (
              <Image
                key={index}
                className="w-full h-455 object-cover"
                width={1440}
                height={455}
                src={image}
                alt="place"
              />
            ),
        )
      ) : (
        <Image
          className="w-full h-455 object-cover"
          width={1440}
          height={455}
          src={placeData.imageSource}
          alt="defalut"
          priority
        />
      )}
      <h2 className="mt-20 text-20 font-bold">{placeData.title}</h2>
      <p className="text-center ml-284 mr-314">{placeData.description}</p>
    </>
  );
};

export default LocationDescription;
