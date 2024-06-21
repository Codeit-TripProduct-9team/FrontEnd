import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import { useOverlay } from '@toss/use-overlay';

import SharedModal from './SharedModal';

import shareIcon from '@/public/assets/icon/share.svg';

import Modal from '@/src/components/common/modal';
import Button from '@/src/components/common/button';
import { currentPageUrl, shareFacebook, shareKakao, shareTwitter } from '@/src/utils/socialShare';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import informationPageRequestInstance from '@/src/api/InformationPageRequest';
import { getCookie } from '@/src/utils/cookie';

interface ProductButtonProps {
  title: string | undefined;
  description: string | undefined;
  thumbnail: string | undefined;
}

const ProductCardButton = ({ title, description, thumbnail }: ProductButtonProps) => {
  const [myPlcaeRegisterd, setMyPlaceRegistered] = useState(false);

  const route = useRouter();
  const videoId = route.query.id as string;

  const hasLoggeInUserId = getCookie('userId');
  const userId = hasLoggeInUserId;
  const isLoggedIn = userId !== 0;

  const sharedOverlay = useOverlay();
  const sharedOnModal = () => {
    sharedOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <SharedModal
          shareOnFacebook={shareFacebook}
          shareOnKakao={shareKakao({ title, description, thumbnail })}
          shareOnTwitter={shareTwitter}
          currentPageUrl={currentPageUrl}
        />
      </Modal>
    ));
  };

  useEffect(() => {
    const checkUserRegisterPlace = async () => {
      try {
        const checkRegisterdPlace = await informationPageRequestInstance.getRegisteredPlace(userId);
        const checkRegister = checkRegisterdPlace.map((myPlaceList: any) => myPlaceList.title);
        setMyPlaceRegistered(checkRegister.includes(title));
      } catch (error) {
        console.error(error);
      }
    };
    checkUserRegisterPlace();
  }, [title, userId]);

  const handleRegistMyPlace = async () => {
    if (!isLoggedIn) {
      toast.error(TOAST_MESSAGE.FAILED_MY_PLACE);
      return;
    }
    try {
      const response = await informationPageRequestInstance.registerMyPlace(videoId);
      if (response.status === 200) {
        toast.success(TOAST_MESSAGE.SUCCESS_MY_PLCAE);
        setMyPlaceRegistered(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMyPlace = async () => {
    try {
      const response = await informationPageRequestInstance.deleteMyPlace(videoId, userId);
      if (response.status === 200) {
        toast.success(TOAST_MESSAGE.DELETE_MY_PLACE);
        setMyPlaceRegistered(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRouteCustomCourse = async () => {
    if (!isLoggedIn) {
      route.push('/signin');
      return;
    }
    if (!myPlcaeRegisterd) {
      await handleRegistMyPlace();
    }
    setTimeout(() => {
      route.push(`/my-course`);
    }, 500);
  };

  return (
    <div className="flex gap-12">
      <Button className="bg-blue w-134 h-39 text-18 font-bold" textColor={'white'} onClick={handleRouteCustomCourse}>
        지금 코스짜기
      </Button>
      {isLoggedIn &&
        (myPlcaeRegisterd ? (
          <Button className="bg-red w-161 h-39 text-18 font-bold" textColor={'white'} onClick={handleDeleteMyPlace}>
            마이플레이스 삭제
          </Button>
        ) : (
          <Button className="bg-blue w-161 h-39 text-18 font-bold" textColor={'white'} onClick={handleRegistMyPlace}>
            마이플레이스 등록
          </Button>
        ))}
      <button className="flex items-center py-6 px-16 rounded-s bg-gray-10" onClick={sharedOnModal}>
        <Image src={shareIcon} alt="share" width={27} height={27} />
      </button>
    </div>
  );
};

export default ProductCardButton;
