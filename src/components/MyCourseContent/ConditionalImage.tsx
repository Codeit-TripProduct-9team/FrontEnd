import Image from 'next/image';
import noImage from '@/public/assets/noImage.png';

interface ConditionalImageProps {
  img: string;
  width?: number;
  height?: number;
}

const ConditionalImage = ({ img, width = 321, height = 180 }: ConditionalImageProps) => {
  return (
    <div className="relative w-321 h-180 rounded-s cursor-pointer overflow-hidden">
      <span className="absolute w-full h-full object-cover ">
        {img === 'img' ? (
          <Image src={noImage} alt="img" width={width} height={height} />
        ) : (
          <Image src={img} alt="place" width={width} height={height} />
        )}
      </span>
    </div>
  );
};

export default ConditionalImage;
