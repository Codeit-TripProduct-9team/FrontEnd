const CourseItemSkeleton = () => {
  return (
    <article>
      <div className="mb-12 bg-gray-200 px-20 py-10 text-gray-500 rounded-s animate-pulse h-80">
        <div className="flex flex-row items-center">
          <div className="mr-15 max-w-500 bg-gray-300 h-6 w-48 rounded"></div>
        </div>
        <div className="flex gap-17 mt-15">
          <div className="flex items-center w-300 mt-12">
            <p className="pr-10 w-150 bg-gray-300 h-6 rounded"></p>
            <div className="flex items-center gap-10 w-full ">
              <div className="w-5 h-5 rounded-full bg-gray-300"></div>
              <hr className="border-dashed border-1 w-200 border-gray-300" />
              <div className="w-5 h-5 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 mb-40 animate-pulse">
        <div className="relative w-321 h-180 rounded-s">
          <div className="absolute bg-gray-300 w-full h-full"></div>
        </div>
      </div>
    </article>
  );
};

export default CourseItemSkeleton;
