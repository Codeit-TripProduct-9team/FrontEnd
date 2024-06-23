import Image from 'next/image';
import { useOverlay } from '@toss/use-overlay';
import Modal from '../../common/modal';
import LoadMoreModal from '../LoadMoreModal';
import { Course } from '@/src/lib/types';
import consolidatePlans from '@/src/utils/combineDayPlans';
import ConditionalImage from '../ConditionalImage';
import trash from '@/public/assets/icon/trashIcon.png';
import pencil from '@/public/assets/icon/pencilIcon.png';
import { useRouter } from 'next/router';
import DeleteCourseModal from '../DeleteCourseModal';
import { useCourseStore } from '@/src/utils/zustand/useCourseStore/useCourseStore';
import noImage from '@/public/assets/image/noImage.png';

const CourseItem = ({ id, name, plan }: Course) => {
  const { setData } = useCourseStore();
  const router = useRouter();
  const loadMoreOverlay = useOverlay();

  const handleRouteChange = () => {
    const courseData = {
      name: name,
      plan: plan,
    };
    setData(courseData);
    router.push(`/course/${id}`);
  };
  const planData = consolidatePlans(plan);
  const firstThreePlaces = planData.slice(0, 3);
  const fourthPlace = planData[3];
  const remainingCount = planData.length - 3;

  const handleLoadMoreClick = () => {
    loadMoreOverlay.open(({ isOpen, close }) => (
      <Modal
        className="w-1000 max-h-900"
        isOpen={isOpen}
        close={() => {
          close();
        }}
      >
        <LoadMoreModal plan={plan} />
      </Modal>
    ));
  };
  const handleDeleteModal = () => {
    loadMoreOverlay.open(({ isOpen, close }) => (
      <Modal
        isOpen={isOpen}
        close={() => {
          close();
        }}
      >
        <DeleteCourseModal courseId={id} courseName={name} close={close} />
      </Modal>
    ));
  };

  const getValidImageUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.href;
    } catch (e) {
      console.error('Invalid image URL', url);
      return '';
    }
  };

  return (
    <article>
      <div className="mb-12 bg-white px-20 py-10 text-gray-70 rounded-s">
        <div className="flex flex-row items-center">
          <strong className="mr-15 max-w-500 whitespace-nowrap overflow-hidden text-ellipsis">{name}</strong>
          <button className="mr-5" type="button" onClick={handleRouteChange}>
            <Image src={pencil} alt="icon" width={15} height={15} />
          </button>
          <button type="button" onClick={handleDeleteModal}>
            <Image src={trash} alt="icon" width={20} height={20} />
          </button>
        </div>
        <div className="flex gap-17 mt-12">
          {firstThreePlaces.map((place, id) => (
            <div key={id} className="flex w-300">
              <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis pr-10 w-150">
                {place.id} <span className="font-normal">{place.name}</span>
              </p>
              {place.id !== planData.length && planData.length !== 3 && (
                <div className="flex items-center gap-2 w-full max-w-185">
                  <div className="w-5 h-5 rounded-full bg-gray-70"></div>
                  <hr className="border-dashed border-1 w-200" />
                  <div className="w-5 h-5 rounded-full bg-gray-70"></div>
                </div>
              )}
            </div>
          ))}
          {planData.length > 3 ? (
            <p>
              <button type="button" onClick={handleLoadMoreClick}>
                더보기
              </button>
            </p>
          ) : (
            <p className="text-right w-full">
              <button type="button" onClick={handleLoadMoreClick}>
                상세보기
              </button>
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-10 mb-40">
        {firstThreePlaces.map((place, id) => (
          <ConditionalImage key={id} img={getValidImageUrl(place.img)} />
        ))}
        {fourthPlace && (
          <div onClick={handleLoadMoreClick} className="relative w-321 h-180 rounded-s overflow-hidden cursor-pointer">
            <div className="absolute bg-black opacity-50 w-full h-full"></div>
            <p className="absolute top-80 left-130 text-white">+ {remainingCount} more</p>
            <Image
              key={fourthPlace.index}
              src={getValidImageUrl(fourthPlace.img) || noImage}
              alt="place"
              width={321}
              height={207}
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default CourseItem;
