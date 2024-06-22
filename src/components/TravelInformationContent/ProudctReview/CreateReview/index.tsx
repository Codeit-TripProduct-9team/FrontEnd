import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import ReviewTextArea from './ReveiwTextarea';
import ReviewScore from './ReviewScore';

import { instance } from '@/src/api/axios';
import { getCookie } from '@/src/utils/cookie';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import { useOverlay } from '@toss/use-overlay';
import Modal from '@/src/components/common/modal';
import LoginModal from './LoginModal';
import { useRouter } from 'next/router';
import { useRedirectStore } from '@/src/utils/zustand/useRedirectStore';

interface CreateReviewProps {
  videoId: string;
  renderReveiwList: () => void;
}

const CreateReview = ({ videoId, renderReveiwList }: CreateReviewProps) => {
  const [score, setScore] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const hasToken = getCookie('accessToken');
  const hasLoggedInNickname = getCookie('nickname');
  const { setRedirectUrl } = useRedirectStore();
  const route = useRouter();

  const loginOverlay = useOverlay();
  const loginModal = () => {
    loginOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <LoginModal handleRouteLogin={handleRouteLogin} />
      </Modal>
    ));
  };

  const handleRouteLogin = () => {
    setRedirectUrl(window.location.href);
    localStorage.setItem('reviewTitle', title);
    localStorage.setItem('reviewContent', content);
    localStorage.setItem('reviewScore', score.toString());
    route.push('/signin');
  };

  useEffect(() => {
    const savedTitle = localStorage.getItem('reviewTitle');
    const savedContent = localStorage.getItem('reviewContent');
    const savedScore = localStorage.getItem('reviewScore');

    if (savedTitle) setTitle(savedTitle);
    if (savedContent) setContent(savedContent);
    if (savedScore) setScore(Number(savedScore));

    localStorage.removeItem('reviewTitle');
    localStorage.removeItem('reviewContent');
    localStorage.removeItem('reviewScore');
  }, []);

  const handleCreateReview = async () => {
    const hasScore = score !== 0;

    if (hasLoggedInNickname === undefined) {
      toast.error(TOAST_MESSAGE.FAILED_CREATE_REVIEW);
      loginModal();
      return;
    }

    if (!hasScore) {
      toast.error(TOAST_MESSAGE.EMPTY_SCORE);
      return;
    }

    if (hasScore) {
      const body = { title: title, nickname: hasLoggedInNickname, content: content, score: score };
      try {
        const headers = {
          Authorization: `Bearer ${hasToken}`,
        };
        const response = await instance.post(`/video/${videoId}/review`, body, { headers });
        if (response.status === 200) {
          renderReveiwList();
          setScore(0);
          setContent('');
          setTitle('');
        }

        toast.success(TOAST_MESSAGE.SUCCESS_REVIEW);
      } catch (error: any) {
        if (error.response.message) {
          toast.error(error.response.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-12 border-b-1 border-gray-50">
      <h1 className="text-24 font-bold">리뷰를 작성해 주세요.</h1>
      <ReviewScore score={score} setScore={setScore} />
      <ReviewTextArea
        content={content}
        title={title}
        setContent={setContent}
        setTitle={setTitle}
        createReview={handleCreateReview}
      />
    </div>
  );
};

export default CreateReview;
