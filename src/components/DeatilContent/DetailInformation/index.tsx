import YoutubePlayer from './YoutubePlyaer';
import Button from '../../common/button';
import SelectLike from './selectLike';

interface YoutubeDataProps {
  url: string;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  youtuber: string;
}

const DetailInformation = ({ youtubeData }: { youtubeData: YoutubeDataProps }) => {
  return (
    <section className="flex gap-30">
      <YoutubePlayer youtubeLink={youtubeData.url} />
      <div className="flex flex-col gap-20">
        <h1 className="text-30">{youtubeData.title}</h1>
        <p>{youtubeData.description}</p>
        <div>By {youtubeData.youtuber}</div>
        <div className="flex gap-20">
          <SelectLike />
          <button>🔄</button>
        </div>
        <div className="flex gap-30">
          <Button bgColor={'violet'} textColor={'white'}>
            마이플레이스 등록
          </Button>
          <Button bgColor={'violet'} textColor={'white'}>
            지금 코스짜기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DetailInformation;
