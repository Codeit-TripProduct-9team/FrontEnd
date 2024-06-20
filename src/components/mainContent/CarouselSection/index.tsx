import React, { useEffect, useState } from 'react';
import CarouselCard from './CarouselCard';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import CarouselMain from './CarouselMain';
import mainPageRequestInstance from '@/src/api/mainPageRequest';
const CarouselSection = () => {
  const [hotCards, setHotCards] = useState([]);
  useEffect(() => {
    const fetchCarouselCardList = async () => {
      try {
        const cardData = await mainPageRequestInstance.getCarouselCardList();
        setHotCards(cardData);
      } catch (error) {
        console.error('Error fetching card list:', error);
      }
    };
    fetchCarouselCardList();
  }, []);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      rewind={true}
      navigation={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView="auto"
    >
      <SwiperSlide>
        <CarouselMain />
      </SwiperSlide>
      {hotCards.map((datas, index) => (
        <SwiperSlide key={`carousel${index}`}>
          <CarouselCard data={datas} key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselSection;
