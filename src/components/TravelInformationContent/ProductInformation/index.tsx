import Button from '../../common/button';

import YoutubePlayer from './YoutubePlyaer';
import SelectLike from './selectLike';
import ShareContents from './SahreContents';
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
  };
}

const TravelProduct = ({ youtubeData }: YoutubedataProps) => {
  return (
    <section className="flex gap-30">
      <YoutubePlayer youtubeLink={youtubeData.url} />
      <div className="flex flex-col gap-20">
        <h1 className="text-30">{youtubeData.title}</h1>
        <p>{youtubeData.description}</p>
        <div>By {youtubeData.youtuber}</div>
        <div className="flex gap-20">
          <SelectLike contentId={youtubeData.id} />
          <ShareContents youtubeData={youtubeData} />
        </div>
        <div className="flex gap-30">
          <Button className="bg-blue" textColor={'white'}>
            마이플레이스 등록
          </Button>
          <Link href="/my-route">
            <Button className="bg-blue" textColor={'white'}>
              지금 코스짜기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelProduct;
