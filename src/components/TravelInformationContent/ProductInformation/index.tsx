import Button from '../../common/button';

import YoutubePlayer from './YoutubePlyaer';

import Link from 'next/link';

interface YoutubedataProps {
  youtubeData: {
    id: number;
    url: string;
    thumbnail: string;
    likes: number;
    title: string;
    description: string;
    youtuber: string;
    viewCount: string;
    saveCount: number;
    updatedAt: string;
    tag: string[];
  };
}

const TravelProduct = ({ youtubeData }: YoutubedataProps) => {
  const numberInformation = `조회수 ${youtubeData.viewCount}회 · 저장수 ${youtubeData.saveCount}회 · ${youtubeData.updatedAt}`;

  return (
    <section className="flex w-full  pt-48 pb-80 px-120  ">
      <div className="flex  bg-white gap-32 w-full p-35 rounded-l">
        <div className="flex items-center justify-center min-w-568 rounded-l overflow-hidden">
          <YoutubePlayer youtubeLink={youtubeData.url} />
        </div>
        <div className="flex flex-col w-full h-full gap-24">
          <h1 className="text-28 font-bold">{youtubeData.title}</h1>
          <div className="flex flex-col gap-12 text-gray-70">
            <p className="text-20 text-gray-50">{youtubeData.description}</p>
            <div>{numberInformation}</div>
            <div className="flex gap-10 ">
              {youtubeData.tag.map((tag, index) => (
                <div className="flex rounded-s font-bold bg-gray-10 py-8 px-30  text-16" key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-grow" />
          <div className="flex justify-end  gap-12">
            <Link href="/my-route">
              <Button className="bg-blue w-134 h-39 text-18 font-bold" textColor={'white'}>
                지금 코스짜기
              </Button>
            </Link>
            <Button className="bg-blue w-161 h-39 text-18 font-bold" textColor={'white'}>
              마이플레이스 등록
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelProduct;
