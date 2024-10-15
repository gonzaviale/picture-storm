import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { PaginationProps } from '../../types';


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPictures, picturesPerPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPictures / picturesPerPage);

    const visiblePageButtons = 3;
    const halfVisible = Math.floor(visiblePageButtons / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
        endPage = Math.min(visiblePageButtons, totalPages);
    }

    if (currentPage + halfVisible >= totalPages) {
        startPage = Math.max(1, totalPages - visiblePageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mb-4 flex justify-center mt-4 items-center space-x-2">
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-full text-xs ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed text-black' : 'bg-blue-500 text-white'}`}
            >
                <ArrowLeftIcon className="h-4 w-4" />
            </button>
            {startPage > 1 && (
                <>
                    <button
                        onClick={() => paginate(1)}
                        className={`px-3 py-2 rounded-full text-xs bg-white/50 text-black`}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="px-2">...</span>}
                </>
            )}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-2 rounded-full text-xs ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-white/50 text-black'}`}
                >
                    {number}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2">...</span>}
                    <button
                        onClick={() => paginate(totalPages)}
                        className={`px-3 py-2 rounded-full text-xs bg-white/50 text-black`}
                    >
                        {totalPages}
                    </button>
                </>
            )}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-full text-xs ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed text-black' : 'bg-blue-500 text-white'}`}
            >
                <ArrowRightIcon className="h-4 w-4" />
            </button>
        </div>
    );
};


export default Pagination;
