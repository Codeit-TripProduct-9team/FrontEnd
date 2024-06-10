import Image from 'next/image';
import { PlaceData } from '../types';
import Link from 'next/link';

type CourseItemProps = {
  name: string;
  places: PlaceData[];
};

const CourseItem = ({ name, places }: CourseItemProps) => {
  const firstThreePlaces = places.slice(0, 3);
  const fourthPlace = places[3];
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  const remainingCount = places.length - 3;
  return (
    <article>
      <div className="mb-12 bg-white px-20 py-10 text-gray-70 rounded-s">
        <strong>{name}</strong>
        <div className="flex gap-17 mt-12">
          {firstThreePlaces.map((place, index) => (
            <div key={place.id} className={`flex ${index === 0 ? 'w-301' : 'w-315'}`}>
              <p className="font-bold whitespace-nowrap pr-10">
                {index + 1} <span className="font-normal">{truncateText(place.name, 15)}</span>
              </p>
              {index + 1 !== places.length && places.length !== 3 && (
                <div className="flex items-center gap-2 w-full grow">
                  <div className="w-5 h-5 rounded-full bg-gray-70"></div>
                  <hr className="border-dashed border-1 w-full" />
                  <div className="w-5 h-5 rounded-full bg-gray-70"></div>
                </div>
              )}
            </div>
          ))}
          {places.length > 3 && (
            <p>
              <Link href="">더보기</Link>
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-10 mb-40">
        {firstThreePlaces.map((place) => (
          <Image className="rounded-s" key={place.id} src={place.mainImg} alt="place" width={321} height={207} />
        ))}
        {fourthPlace && (
          <Link href="">
            <div className="relative w-321 h-180 rounded-s overflow-hidden">
              <div className="absolute bg-black opacity-50 w-full h-full"></div>
              <p className="absolute top-80 left-130 text-white">+ {remainingCount} more</p>
              {/* 카드 클릭시 information으로 넘어가지도록*/}
              <Image key={fourthPlace.id} src={fourthPlace.mainImg} alt="place" width={321} height={207} />
            </div>
          </Link>
        )}
      </div>
    </article>
  );
};

export default CourseItem;
