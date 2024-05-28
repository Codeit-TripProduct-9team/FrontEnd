import carousel1 from '@/public/assets/icon/carousel1.png';
import carousel2 from '@/public/assets/icon/carousel2.png';
import carousel3 from '@/public/assets/icon/carousel3.png';
import carousel4 from '@/public/assets/icon/carousel4.png';
import Image from 'next/image';

const CarouselMain = () => {
  return (
    <div className="flex items-center flex-col leading-tight gap-10 flex-shrink-0 bg-blue px-10 border-3 rounded-l font-bold text-100 py-20 text-white ">
      <div className="flex gap-10 items-center">
        Just #like <Image src={carousel1} width={900} height={50} alt="carousel1" className="h-70" />
      </div>
      <div className="flex gap-10 items-center">
        the <Image src={carousel2} width={600} height={50} alt="carousel1" className="h-70" />

        <span>&#34;YouTuber&#039;s</span>
      </div>
      <div className="flex gap-10 items-center">
        <Image src={carousel3} width={150} height={50} alt="carousel1" className="h-70" />
        (proven)
        <Image src={carousel4} width={350} height={50} alt="carousel1" className="h-70" />
        course<span className="font-['Cormorant']">*</span>
      </div>
    </div>
  );
};

export default CarouselMain;
