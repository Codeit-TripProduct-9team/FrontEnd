import { MockDataItem } from '@/src/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Draggable } from '@hello-pangea/dnd';
import { openToast } from '@/src/utils/openToast';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import useYouTubeData from '@/src/hooks/useYouTubeData';

interface ListCardProps {
  data: MockDataItem;
}

const MyRouteListCard = ({ data }: ListCardProps) => {
  const videoId = data.url.split('v=')[1];
  const { thumbnail } = useYouTubeData(videoId);

  const handleDeleteMyPlace = () => {
    openToast.success(TOAST_MESSAGE.DELETE);
  };

  return (
    <Draggable draggableId={`${data.id}-${data.title}`} index={data.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col overflow-hidden bg-white w-225 h-225 rounded-s shadow-main transition-transform duration-300 transform hover:scale-105 cursor-pointer"
        >
          <Link href={`/travel-information/${data.id}`} />
          <div className="relative  border-1 ">
            {thumbnail && <Image src={thumbnail} width={225} height={100} alt="썸네일" priority />}
          </div>
          <div className="flex flex-col justify-between p-10 h-110">
            <div>
              <h2 className="font-bold text-13 mb-5 overflow-ellipsis-2">{data.title}</h2>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5">
                {JSON.parse(data.tag)
                  .slice(0, 2)
                  .map((tag: string, index: number) => (
                    <div className="flex rounded-s font-bold bg-gray-10 py-3 px-10 text-12" key={index}>
                      {tag}
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
      )}
    </Draggable>
  );
};

export default MyRouteListCard;
