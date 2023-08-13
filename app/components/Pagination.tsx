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
        const currentLink = <Link href={`/users?page=${i}`} key={i}> {' '}{i}{' '} </Link>;
        paginationLinks.push((currentPage == i ? i : currentLink));
    }

    return (
        <div>
            {
                currentPage != 1 && <FaChevronLeft
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="pagination-arrow"
                />
            }
            {paginationLinks}
            {
                currentPage < totalPages &&<FaChevronRight
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="pagination-arrow"
                />
            }
        </div>
    );
};

export default Pagination;