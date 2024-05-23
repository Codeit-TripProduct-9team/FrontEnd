import DetailInformation from './DetailInformation';

const data = {
  url: 'https://www.youtube.com/watch?v=or2TgTRjPq8',
  thumbnail: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
  likes: 112,
  title: '[백종원] 백선생과 예산시장한번 가보시는건 어때요?',
  description:
    '백종원이 예산시장에 떴다~! [님아 그시장을 가오 158화]에서 소개된 충남 예산시장에 서 먹부림도 부리고~ 주변에서 들를만한 코스를 추가해서 나만의 여행 코스를 만들어보세요!',
  youtuber: '백종원 PAIK JONG WON',
};

const DetailContent = () => {
  return (
    <div>
      <DetailInformation youtubeData={data} />
      <section>
        <div className="flex">
          box
          <button>proudct</button>
          <button>review</button>
        </div>
        <div>
          <div>이미지</div>
          <h2>place</h2>
          <h3>place descrpition</h3>
          <div>map</div>
        </div>
      </section>
    </div>
  );
};

export default DetailContent;
