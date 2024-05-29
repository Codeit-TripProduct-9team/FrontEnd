import Image from 'next/image';
import search from '@/public/assets/icon/search.png';

const InputNavigator = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center relative shadow-sub text-center text-gray-50 bg-white rounded-s w-300 h-40 py-10 px-30 mb-100 ">
      더 많은 여행지를 검색해 보세요!
      <Image src={search} width={15} height={10} alt="검색이미지" className="absolute right-30 top-13" />
    </div>
  );
};

export default InputNavigator;
