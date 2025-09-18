"use client";
import React, { useState } from "react";

interface PaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  render: (items: T[]) => React.ReactNode;
}

export default function Pagination<T>({
  data,
  itemsPerPage = 3,
  render,
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Render current page items */}
      {render(currentItems)}

      {/* Page numbers only */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 cursor-pointer rounded border border-gray-300 ${
                page === currentPage
                  ? "bg-[#D0A23C] text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
