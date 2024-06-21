import { MockDataItem } from '@/src/lib/types';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';
import { openToast } from '@/src/utils/openToast';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import useYouTubeData from '@/src/hooks/useYouTubeData';
import truncateText from '@/src/utils/truncateText';

interface ListCardProps {
  data: MockDataItem;
}

const MyRouteListCard = ({ data }: ListCardProps) => {
  const { description, img, name, id, tags, title, videoUrl } = data;
  const videoId = videoUrl.split('v=')[1];
  const { thumbnail } = useYouTubeData(videoId);

  const handleDeleteMyPlace = () => {
    openToast.success(TOAST_MESSAGE.DELETE);
  };

  return (
    <Draggable draggableId={`${name}`} index={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col overflow-hidden bg-white w-225 h-225 rounded-s shadow-main cursor-pointer"
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="relative border-1 w-225 h-120">
                  {thumbnail && (
                    <Image src={thumbnail} fill alt="썸네일" priority className="object-cover object-cetner" />
                  )}
                </div>

                <div className="flex flex-col justify-between p-10 h-110">
                  <div>
                    <h2 className="font-bold text-13 mb-5 overflow-ellipsis-2">{title}</h2>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-5">
                      {tags?.slice(0, 2).map((tags: string, index: number) => (
                        <div className="flex rounded-s font-bold bg-gray-10 py-3 px-10 text-12" key={index}>
                          {tags}
                        </div>
                      ))}
                    </div>
                    <div
                      className="transition-transform duration-300 transform hover:scale-105 hover:bg-gray-30 rounded-s font-bold bg-gray-10 py-3 px-10 text-8"
                      onClick={handleDeleteMyPlace}
                    >
                      마이플레이스 삭제
                    </div>
                  </div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="relative border-1 w-225 h-120">
                  {img && <Image src={img} fill alt="장소" priority className="object-cover object-cetner" />}
                </div>
                <div className="flex flex-col p-10 h-110">
                  <div>
                    <h2 className="font-bold text-13 mb-5 overflow-ellipsis-2">{name}</h2>
                  </div>
                  <p className="text-12">{truncateText(description, 65)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default MyRouteListCard;
