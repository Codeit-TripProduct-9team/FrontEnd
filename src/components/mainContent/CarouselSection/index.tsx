import React from 'react';
import CarouselCard from './CarouselCard';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { mock } from '@/src/components/mainContent/mock';
const CarouselSection = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      rewind={true}
      navigation={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className={`
      w-1200 h-450
       `}
    >
      {mock.data.map((datas, index) => (
        <SwiperSlide key={`carousel${index}`}>
          <CarouselCard data={datas} key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselSection;
