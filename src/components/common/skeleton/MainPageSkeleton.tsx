export const ListCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white w-290 h-270 rounded-s shadow-main overflow-hidden">
      <div className="relative border-1 w-290 h-160 bg-gray-20 shimmer" />
      <div className="flex flex-col justify-between p-10 h-110">
        <div className="bg-gray-20 w-200 h-18 rounded-s mt-5 shimmer" />
        <div className="flex justify-between mb-12">
          <div className="flex gap-80">
            <div className="flex gap-5">
              <div className="flex rounded-s font-bold bg-gray-20 h-20 w-40 shimmer" />
              <div className="flex rounded-s font-bold bg-gray-20 h-20 w-40 shimmer" />
            </div>
            <div className="flex rounded-s font-bold bg-gray-20 h-20 w-100 shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
