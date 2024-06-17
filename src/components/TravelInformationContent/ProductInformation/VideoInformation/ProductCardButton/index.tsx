import Link from 'next/link';
import Image from 'next/image';

import { useOverlay } from '@toss/use-overlay';

import SharedModal from './SharedModal';

import shareIcon from '@/public/assets/icon/share.svg';

import Modal from '@/src/components/common/modal';
import Button from '@/src/components/common/button';
import { currentPageUrl, shareFacebook, shareKakao, shareTwitter } from '@/src/utils/socialShare';
import instance from '@/src/api/axios';
import { useRouter } from 'next/router';
import { getCookie } from '@/src/utils/cookie';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ProductButtonProps {
  title: string | undefined;
  description: string | undefined;
  thumbnail: string | undefined;
}

const ProductCardButton = ({ title, description, thumbnail }: ProductButtonProps) => {
  const [isLike, setIsLike] = useState(false);

  const route = useRouter();
  const videoId = route.query.id as string;

  const hasToken = getCookie('accessToken');

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

  const handleRegistMyPlace = async () => {
    const body = { data: null };
    const headers = {
      Authorization: `Bearer ${hasToken}`,
    };
    try {
      const response = await instance.post(`/video/${videoId}/likes`, body, { headers });
      if (response.status === 200) {
        toast.success('나의 코스에 등록되었습니다!');
        setIsLike(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRouteCustomCourse = async () => {
    if (!isLike) {
      await handleRegistMyPlace();
      setTimeout(() => {
        route.push('/my-page');
      }, 500);
    }

    if (isLike) {
      setTimeout(() => {
        route.push('/my-page');
      }, 500);
    }
  };

  return (
    <div className="flex gap-12">
      <Link href="/my-route">
        <Button className="bg-blue w-134 h-39 text-18 font-bold" textColor={'white'} onClick={handleRouteCustomCourse}>
          지금 코스짜기
        </Button>
      </Link>
      <Button
        className={`${isLike ? 'bg-red' : 'bg-blue'} w-161 h-39 text-18 font-bold`}
        textColor={'white'}
        onClick={handleRegistMyPlace}
      >
        {isLike ? '마이플레이스 삭제' : '마이플레이스 등록'}
      </Button>
      <button className="flex items-center py-6 px-16 rounded-s bg-gray-10" onClick={sharedOnModal}>
        <Image src={shareIcon} alt="share" width={27} height={27} />
      </button>
    </div>
  );
};
export default ProductCardButton;
