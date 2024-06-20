import Image from 'next/image';
import noImage from '@/public/assets/noImage.png';

interface ConditionalImageProps {
  img: string;
  width?: number;
  height?: number;
}

const ConditionalImage = ({ img, width = 321, height = 207 }: ConditionalImageProps) => {
  return (
    <span className="rounded-s">
      {img === 'img' ? (
        <Image src={noImage} alt="img" width={width} height={height} />
      ) : (
        <Image src={img} alt="place" width={width} height={height} />
      )}
    </span>
  );
};

export default ConditionalImage;
