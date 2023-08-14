'use client'

import React from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { redirect } from "next/navigation";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			redirect(`/users?page=${newPage}`)
		}
	};

	const paginationLinks = [];
	for (let i = 1; i <= totalPages; i++) {
		const cNames = `mx-1 px-2 py-1 rounded ${currentPage === i
				? "bg-blue-500 text-white"
				: "bg-gray-300 text-gray-700 hover:bg-blue-200"
			}`
		const currentLink = <Link href={`/users?page=${i}`} key={i} className={cNames}> {' '}{i}{' '} </Link>;
		paginationLinks.push((currentPage == i ? i : currentLink));
	}

	return (
		<div className="flex items-center justify-center space-x-2">
      {currentPage !== 1 && (
        <FaChevronLeft
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-5 h-5 text-gray-600 cursor-pointer"
        />
      )}
      {paginationLinks}
      {currentPage < totalPages && (
        <FaChevronRight
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-5 h-5 text-gray-600 cursor-pointer"
        />
      )}
    </div>
	);
};

export default Pagination;