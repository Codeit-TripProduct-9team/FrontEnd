import Image from 'next/image';

import arrowRight from '@/public/assets/icon/arrow-right.svg';
import arrowLeft from '@/public/assets/icon/arrow-left.svg';

interface ReviePaginationProps {
  setPageNumber: (pageNumber: number) => void;
  pageNumber: number;
  maxPage: number;
}

const paginationButtonStyle = 'flex items-center justify-center w-40 h-40  hover:bg-gray-10 disabled:bg-gray-20';

const ReviewPagination = ({ setPageNumber, pageNumber, maxPage }: ReviePaginationProps) => {
  const previousPage = pageNumber - 1;
  const nextPage = pageNumber + 1;
  const firstPage = pageNumber === 0;
  const lastPage = pageNumber === maxPage - 1 || maxPage === 0;
  const currentPage = pageNumber + 1;

  return (
    <div className="flex justify-end mb-30 mr-20">
      <div className="flex items-end  h-40  mr-20">
        Page {currentPage} of {maxPage}
      </div>
      <div className="border border-r-0 border-black ">
        <button className={paginationButtonStyle} onClick={() => setPageNumber(previousPage)} disabled={firstPage}>
          <Image src={arrowLeft} alt="left" width={25} height={25} />
        </button>
      </div>
      <div className="border border-black">
        <button className={paginationButtonStyle} onClick={() => setPageNumber(nextPage)} disabled={lastPage}>
          <Image src={arrowRight} alt="right" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default ReviewPagination;
