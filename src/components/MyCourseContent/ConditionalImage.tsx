import Image from 'next/image';
import noImage from '@/public/assets/noImage.png';
import { twMerge } from 'tailwind-merge';

interface ConditionalImageProps {
  img: string;
  className?: string;
}

const ConditionalImage = ({ img, className }: ConditionalImageProps) => {
  const style = twMerge('relative w-321 h-180 rounded-s cursor-pointer overflow-hidden', className);
  return (
    <div className={`${style}`}>
      <span className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2">
        {img === 'img' ? (
          <Image src={noImage} alt="img" layout="fill" objectFit="cover" />
        ) : (
          <Image src={img.replace(/'/g, '')} alt="place" layout="fill" objectFit="cover" />
        )}
      </span>
    </div>
  );
};

export default ConditionalImage;
