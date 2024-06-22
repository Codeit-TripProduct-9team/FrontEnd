import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { ChevronRightIcon } from '@heroicons/react/16/solid';

const MyRouteCardSectionPagination = ({ offset, setOffset, maxOffset, handlePreviousPage, handleNextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= maxOffset; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-40 flex justify-center items-center">
      <div
        className={`w-30 h-30 flex justify-center items-center cursor-pointer border-1 border-gray-30 rounded-4 ${
          offset === 1 && 'opacity-25 cursor-not-allowed'
        }`}
        onClick={handlePreviousPage}
      >
        <ChevronLeftIcon />
      </div>
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
              className={`border-1 border-gray-30 w-30 h-30 rounded-4 flex justify-center items-center ${
                number === offset && 'bg-blue text-white'
              }`}
            >
              {number}
            </button>
          );
        }

        if (number === offset - 2 || number === offset + 2) {
          return (
            <span key={number} className="flex items-center justify-center mx-6">
              ...
            </span>
          );
        }

        return null;
      })}
      <div
        className={`w-30 h-30 flex justify-center items-center cursor-pointer border-1 border-gray-30 rounded-4 ${
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
