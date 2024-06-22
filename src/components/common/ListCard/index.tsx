import mainPageRequestInstance from '@/src/api/mainPageRequest';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import useYouTubeData from '@/src/hooks/useYouTubeData';
import { CardDataItem } from '@/src/lib/types';
import { getCookie } from '@/src/utils/cookie';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import trashIcon from '@/public/assets/icon/trashIcon.png';
import adminPageRequestInstance from '@/src/api/adminPageRequest';

interface ListCardProps {
  data: CardDataItem;
}

const ListCard = ({ data }: ListCardProps) => {
  const videoId = data.videoUrl.split('v=')[1];
  const { thumbnail } = useYouTubeData(videoId);
  const userId = getCookie('userId');
  const token = getCookie('accessToken');
  const userNickname = getCookie('nickname');
  const [myPlace, setMyPlace] = useState<number[]>([]);
  const [isPending, setIsPending] = useState(false);

  const handleClickMyPlace = async (e: MouseEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error(TOAST_MESSAGE.FAILED_MY_PLACE);
      return;
    }
    if (!myPlace.includes(data.id)) {
      try {
        setIsPending(true);
        const response = await mainPageRequestInstance.registerMyPlace(data.id);
        if (response.status === 200) {
          setTimeout(() => toast.success(TOAST_MESSAGE.SUCCESS_MY_PLCAE), 1000);
          setTimeout(() => setIsPending(false), 1500);
          compareMyPlaceWithCardListId();
        }
      } catch (error) {
        console.error(error);
        toast.error(TOAST_MESSAGE.FAILED_REQUEST);
      }
    } else {
      try {
        setIsPending(true);
        const response = await mainPageRequestInstance.deleteMyPlace(data.id, userId);
        if (response.status === 200) {
          setTimeout(() => toast.success(TOAST_MESSAGE.DELETE_MY_PLACE), 1000);
          setTimeout(() => setIsPending(false), 1500);
          compareMyPlaceWithCardListId();
        }
      } catch (error) {
        console.error(error);
        toast.error(TOAST_MESSAGE.FAILED_REQUEST);
      }
    }
  };
  const compareMyPlaceWithCardListId = async () => {
    if (!token) return;
    const checkRegisterdPlace = await mainPageRequestInstance.getRegisteredPlace(userId);
    const checkRegister = checkRegisterdPlace?.map((myPlaceList: any) => myPlaceList.id);
    setMyPlace(checkRegister);
  };

  const handleCardDelete = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const response = await adminPageRequestInstance.deleteVideo(data.id);
      if (response.status === 200) {
        toast.success(TOAST_MESSAGE.DELETE_MY_PLACE);
        setIsPending(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(TOAST_MESSAGE.FAILED_REQUEST);
    }
  };

  useEffect(() => {
    const compareMyPlaceWithCardListId = async () => {
      if (!token) return;
      const checkRegisterdPlace = await mainPageRequestInstance.getRegisteredPlace(userId);
      const checkRegister = checkRegisterdPlace?.map((myPlaceList: any) => myPlaceList.id);
      setMyPlace(checkRegister);
    };
    compareMyPlaceWithCardListId();
  }, [userId, token]);

  if (!myPlace) return;
  return (
    <div>
      <Link href={`/travel-information/${data.id}`}>
        <div className="flex flex-col overflow-hidden bg-white w-290 h-270 rounded-30 transition-transform duration-300 transform hover:scale-105 cursor-pointer">
          <div className="relative border-1 w-290 h-160">
            {thumbnail && <Image src={thumbnail} fill alt="썸네일" priority className="object-cover object-center" />}
            {userNickname === 'utripadmin' && (
              <div
                onClick={handleCardDelete}
                className="absolute w-40 h-40 top-10 right-10 z-20 bg-gray-30 opacity-70 rounded-30 hover:scale-105"
              >
                <Image src={trashIcon} width={40} height={40} alt="비디오삭제관리자전용" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between p-10 h-110">
            <div>
              <h2 className="font-bold text-18 mb-5 overflow-ellipsis-2">{data.title}</h2>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5">
                {data.tags?.slice(0, 2).map((tag, index) => (
                  <div className="flex rounded-s font-bold bg-gray-10 py-3 px-10 text-12" key={index}>
                    {tag}
                  </div>
                ))}
              </div>
              {!myPlace.includes(data.id) ? (
                <div
                  className="z-10 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-30 rounded-s font-bold bg-gray-10 py-3 px-10 text-12"
                  onClick={handleClickMyPlace}
                >
                  {isPending ? (
                    <div className="flex justify-center items-center">
                      <div className="w-10 h-10 mt-3  border-4 border-blue-500 border-t-transparent rounded-full spin"></div>
                    </div>
                  ) : (
                    '마이플레이스 등록'
                  )}
                </div>
              ) : (
                <div
                  className={`${
                    isPending ? 'bg-gray-30' : 'bg-red'
                  } z-10 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-30 rounded-s font-bold text-white py-3 px-10 text-12`}
                  onClick={handleClickMyPlace}
                >
                  {isPending ? (
                    <div className="flex justify-center items-center">
                      <div className="w-10 h-10  mt-3 border-4 border-blue-500 border-t-transparent rounded-full spin"></div>
                    </div>
                  ) : (
                    '마이플레이스 삭제'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListCard;
