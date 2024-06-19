import Image from 'next/image';
import { useOverlay } from '@toss/use-overlay';
import Modal from '../../common/modal';
import LoadMoreModal from '../LoadMoreModal';
import { Course } from '@/src/lib/types';
import consolidatePlans from '@/src/utils/combineDayPlans';
import ConditionalImage from '../ConditionalImage';

const CourseItem = ({ name, plan }: Course) => {
  const planData = consolidatePlans(plan);
  const firstThreePlaces = planData.slice(0, 3);
  const fourthPlace = planData[3];
  const remainingCount = planData.length - 3;

  const loadMoreOverlay = useOverlay();
  const handleLoadMoreClick = () => {
    loadMoreOverlay.open(({ isOpen, close }) => (
      <Modal
        isOpen={isOpen}
        close={() => {
          close();
        }}
      >
        <LoadMoreModal plan={plan} />
      </Modal>
    ));
  };

  return (
    <article>
      <div className="mb-12 bg-white px-20 py-10 text-gray-70 rounded-s">
        <strong>{name}</strong>
        <div className="flex gap-17 mt-12">
          {firstThreePlaces.map((place) => (
            <div key={place.index} className={`flex ${place.index === 0 ? 'w-301' : 'w-315'}`}>
              <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis pr-10 w-150">
                {place.index} <span className="font-normal">{place.name}</span>
              </p>
              {place.index !== planData.length && planData.length !== 3 && (
                <div className="flex items-center gap-2 w-full grow">
                  <div className="w-5 h-5 rounded-full bg-gray-70"></div>
                  <hr className="border-dashed border-1 w-200" />
                  <div className="w-5 h-5 rounded-full bg-gray-70"></div>
                </div>
              )}
            </div>
          ))}
          {firstThreePlaces.length > 3 && (
            <p>
              <button type="button" onClick={handleLoadMoreClick}>
                더보기
              </button>
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-10 mb-40">
        {firstThreePlaces.map((place) => (
          <ConditionalImage key={place.index} img={place.img} />
        ))}
        {fourthPlace && (
          <div onClick={handleLoadMoreClick} className="relative w-321 h-180 rounded-s overflow-hidden cursor-pointer">
            <div className="absolute bg-black opacity-50 w-full h-full"></div>
            <p className="absolute top-80 left-130 text-white">+ {remainingCount} more</p>
            <Image key={fourthPlace.index} src={fourthPlace.img} alt="place" width={321} height={207} />
          </div>
        )}
      </div>
    </article>
  );
};

export default CourseItem;
