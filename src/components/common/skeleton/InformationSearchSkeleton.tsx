const InformationSearchSkeleton = () => {
  return (
    <>
      <div className="w-87 h-87 bg-gray-40 rounded-m overflow-hidden"></div>
      <div className="flex flex-col justify-between w-450">
        <div className="w-300 h-30 rounded-l bg-gray-40"></div>
        <div className="w-100 h-15 rounded-l bg-gray-40"></div>
        <div className="flex gap-8 ">
          <div className="w-40  h-20  bg-gray-40 rounded-l"></div>
          <div className="w-40  h-20 bg-gray-40 rounded-l"></div>
        </div>
      </div>
    </>
  );
};

export default InformationSearchSkeleton;
