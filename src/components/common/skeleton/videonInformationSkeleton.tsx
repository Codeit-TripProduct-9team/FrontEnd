const VideoInformationSkeleton = () => {
  return (
    <div className="flex items-center justify-center w-full  h-448 gap-32 rounded-l ">
      <div className="w-589 h-368 bg-gray-30 rounded-l"></div>
      <div className="flex flex-col  h-378 gap-36">
        <div className="flex flex-col gap-12">
          <div className="w-975 h-42 bg-gray-30 rounded-l "></div>
          <div className="w-600 h-42 bg-gray-30 rounded-l "></div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="w-700 h-30 bg-gray-30 rounded-l"></div>

          <div className="flex w-356 h-24 bg-gray-30 rounded-l"></div>
        </div>
        <div className=" flex gap-20">
          <div className="w-93 h-30 bg-gray-30 rounded-l"></div>
          <div className="w-93 h-30 bg-gray-30 rounded-l"></div>
        </div>
        <div className="flex-grow" />
        <div className=" flex gap-20">
          <div className="w-200 h-50 bg-gray-30 rounded-l"></div>
          <div className="w-200 h-50 bg-gray-30 rounded-l"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoInformationSkeleton;
