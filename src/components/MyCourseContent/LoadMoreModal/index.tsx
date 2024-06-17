import PlaceOfData from './PlaceOfData';

const data = [
  {
    day: 1,
    place: [
      {
        index: 1,
        name: '예산시장',
        img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
        posX: 36.67723813,
        posY: 126.8495587,
      },
      {
        index: 2,
        name: '광주',
        img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
        posX: 35.1653428,
        posY: 126.9092003,
      },
      {
        index: 3,
        name: '서울',
        img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
        posX: 37.5666791,
        posY: 126.9782914,
      },
    ],
  },
  {
    day: 2,
    place: [
      {
        index: 1,
        name: '경포해수욕장',
        img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
        posX: 37.8054863,
        posY: 128.9078306,
      },
      {
        index: 2,
        name: '김해',
        img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
        posX: 35.2285653,
        posY: 128.889362,
      },
    ],
  },
];

const LoadMoreModal = () => {
  return (
    <>
      <section>
        <div>지도 일자별 경로 표시</div>
      </section>
      <section>
        {data.map((planData) => (
          <article key={planData.day}>
            <div>
              <strong>{planData.day}일차</strong>
            </div>
            {planData.place.map((placeData) => (
              <PlaceOfData key={placeData.index} data={placeData} />
            ))}
          </article>
        ))}
      </section>
    </>
  );
};

export default LoadMoreModal;
