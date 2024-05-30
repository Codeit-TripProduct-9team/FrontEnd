import React from 'react';
import PlaceItem from './PlaceItem';
import { Droppable } from '@hello-pangea/dnd';
import { MockMyRouteData } from './mockMyRoute';

export const mockMyRoute: MockMyRouteData = {
  data: [
    {
      cardId: 1,
      thumbnail: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
      likes: 112,
      title: '[백종원] 백선생과 예산시장한번 가보시는건 어때요?',
      description:
        '백종원이 예산시장에 떴다~! [님아 그시장을 가오 158화]에서 소개된 충남 예산시장에서 먹부림도 부리고~ 주변에서 들를만한 코스를 추가해서 나만의 여행 코스를 만들어보세요!',
      tag: ['🛤️충남', '🧺시장', '먹방🌭'],
      place: '예산시장',
      latlng: { lat: 36.67723813, lng: 126.8495587 },
    },
    {
      cardId: 2,
      thumbnail: 'https://i.ytimg.com/vi/zrLdC7aYy64/maxresdefault.jpg',
      likes: 110,
      title: '[풍자] 풍자와 함께 광주 먹부림 고고~',
      description:
        '풍자가 광주에 떴다~! [또간집 19화]에서 소개된 광주에서 먹부림도 부리고~ 주변에서 들를만한 코스를 추가해서 나만의 여행 코스를 만들어보세요!',
      tag: ['🛤️광주', '먹방🌭'],
      place: '광주',
      latlng: { lat: 35.1653428, lng: 126.9092003 },
    },
    {
      cardId: 3,
      thumbnail: 'https://i.ytimg.com/vi/lF866XB7uaQ/maxresdefault.jpg',
      likes: 105,
      title: '[곽튜브] 서울 데이트 코스 추천해드릴게요!',
      description:
        '소중한 연인과 함께 곽튜브 [찐따남의 가슴 따뜻한 서울 여행기]에피소드에서 소개된 데이트코스 소개해드릴게요!',
      tag: ['🛤️서울', '데이트👩‍❤️‍👨'],
      place: '서울',
      latlng: { lat: 37.5666791, lng: 126.9782914 },
    },
    {
      cardId: 4,
      thumbnail: 'https://i.ytimg.com/vi/U8EijSQGoQ4/mqdefault.jpg',
      likes: 98,
      title: '[라임튜브] 더운 여름엔 강원도 해수욕장으로~~',
      description: '무더운 여름엔 강원도로 여행을 떠나보시는건 어때요??',
      tag: ['🛤️강원', '가족👪', '바다🌊'],
      place: '경포해수욕장',
      latlng: { lat: 37.8054863, lng: 128.9078306 },
    },
    {
      cardId: 5,
      thumbnail: 'https://i.ytimg.com/vi/SAS0o6ndQ5w/maxresdefault.jpg',
      likes: 80,
      title: '[여행능력자들] 떠오르는 신흥핫플 경남 김해로 여행을 떠나요~~ ',
      description: '소중한 연인과 함께 요즘 떠오르고 있는 핫플레이스 경남 김해에서 멋진 추억을 쌓아보세요!',
      tag: ['🛤️경남', '가족👪'],
      place: '김해',
      latlng: { lat: 35.2285653, lng: 128.889362 },
    },
  ],
};

//맵에 표시할 때 좌표값 필요
const DATA = [
  {
    day: 1,
    places: [
      { id: 1, name: '예산시장' },
      { id: 2, name: '광주' },
    ],
  },
  {
    day: 2,
    places: [
      { id: 3, name: '서울' },
      { id: 4, name: '경포해수욕장' },
      { id: 5, name: '김해' },
    ],
  },
];

export type PlaceList = {
  day: number;
  places: Place[];
};

export type Place = {
  place: {
    id: number;
    name: string;
  };
};

const PlaceList = () => {
  return (
    <div className="relative">
      <span className="absolute text-12 text-gray-50 right-0 top-4">
        드래그앤 드랍으로 마음에 드는 여행지를 내 계획에 포함해보세요
      </span>
      {DATA.map((data) => (
        <div key={data.day} className="my-20">
          <h2 className="font-bold mb-12">{data.day}일차</h2>
          <Droppable droppableId={`day-${data.day}`}>
            {(provided) => (
              <ul className="flex flex-col gap-12" ref={provided.innerRef} {...provided.droppableProps}>
                {data.places.map((place, index) => (
                  <PlaceItem key={place.id} place={place} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
};

export default PlaceList;
