import Link from 'next/link';

import Button from '../../common/button';

import YoutubePlayer from '../ProductInformation/YoutubePlyaer';
import SelectLike from '../ProductInformation/selectLike';
import ShareYoutube from '../ProductInformation/SahreYotube';

const youtubeData = {
  url: 'https://www.youtube.com/watch?v=or2TgTRjPq8',
  thumbnail: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
  likes: 112,
  title: '[백종원] 백선생과 예산시장한번 가보시는건 어때요?',
  description:
    '백종원이 예산시장에 떴다~! [님아 그시장을 가오 158화]에서 소개된 충남 예산시장에 서 먹부림도 부리고~ 주변에서 들를만한 코스를 추가해서 나만의 여행 코스를 만들어보세요!',
  youtuber: '백종원 PAIK JONG WON',
};

const YoutubeInformation = () => {
  const handleAddMyPlace = () => {
    alert('등록');
  };

  return (
    <section className="flex gap-30">
      <YoutubePlayer youtubeLink={youtubeData.url} />
      <div className="flex flex-col gap-20">
        <h1 className="text-30">{youtubeData.title}</h1>
        <p>{youtubeData.description}</p>
        <div>By {youtubeData.youtuber}</div>
        <div className="flex gap-20">
          <SelectLike />
          <ShareYoutube />
        </div>
        <div className="flex gap-30">
          <Button onClick={handleAddMyPlace} bgColor={'violet'} textColor={'white'}>
            마이플레이스 등록
          </Button>
          <Link href="/myplace">
            <Button bgColor={'violet'} textColor={'white'}>
              지금 코스짜기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default YoutubeInformation;
