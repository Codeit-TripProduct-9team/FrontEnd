import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

const MyRouteCardSectionPagination = () => {
  // const { offset, maxOffset, handleNextPage, handlePreviousPage } = useDashboardList();
  const [offset, setOffset] = useState(1);
  const maxOffset = 10;
  const pageNumbers = [];
  for (let i = 1; i <= maxOffset; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (offset < maxOffset) {
      setOffset(offset + 1);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 1) {
      setOffset(offset - 1);
    }
  };

  return (
    <div className="mt-40 flex gap-20 justify-center items-center">
      <div
        className={`w-30 h-30 flex justify-center items-center cursor-pointer ${
          offset === 1 && 'opacity-25 cursor-not-allowed'
        }`}
        onClick={handlePreviousPage}
      >
        <ChevronLeftIcon />
      </div>
      <div className="flex gap-4 justify-center items-center">
        {pageNumbers.map((number) => {
          if (
            number === 1 ||
            number === maxOffset ||
            number === offset ||
            number === offset + 1 ||
            number === offset - 1
          ) {
            return (
              <button
                key={number}
                onClick={() => setOffset(number)}
                disabled={number === offset}
                className={`border-1 w-30 h-30 rounded-4 flex justify-center items-center ${
                  number === offset && 'bg-blue text-white'
                }`}
              >
                {number}
              </button>
            );
          }

          if (number === offset - 2 || number === offset + 2) {
            return (
              <span key={number} className="flex items-center justify-center">
                ...
              </span>
            );
          }

          return null;
        })}
      </div>
      <div
        className={`w-30 h-30 flex justify-center items-center cursor-pointer ${
          offset === maxOffset && 'opacity-25 cursor-not-allowed'
        }`}
        onClick={handleNextPage}
      >
        <ChevronRightIcon />
      </div>
    </div>
  );
};

export default MyRouteCardSectionPagination;
