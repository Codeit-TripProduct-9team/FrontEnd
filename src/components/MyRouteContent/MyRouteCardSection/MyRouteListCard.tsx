import { CardDataItem } from '@/src/lib/types';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';
import useYouTubeData from '@/src/hooks/useYouTubeData';
import truncateText from '@/src/utils/truncateText';

interface ListCardProps {
  data: CardDataItem;
}

const MyRouteListCard = ({ data }: ListCardProps) => {
  const { description, img, name, id, tags, title, videoUrl } = data;
  const videoId = videoUrl.split('v=')[1];
  const { thumbnail } = useYouTubeData(videoId);
  const MAXIMUM_DESCRIPTION_LENGTH = 65;

  return (
    <Draggable draggableId={name} index={id}>
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
                    <Image src={thumbnail} fill alt="썸네일" priority className="object-cover object-center" />
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
                  </div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="relative border-1 w-225 h-120">
                  {img && <Image src={img} fill alt="장소" priority className="object-cover object-center" />}
                </div>
                <div className="flex flex-col p-10 h-110">
                  <div>
                    <h2 className="font-bold text-13 mb-5 overflow-ellipsis-2">{name}</h2>
                  </div>
                  <p className="text-12">{truncateText(description, MAXIMUM_DESCRIPTION_LENGTH)}</p>
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
