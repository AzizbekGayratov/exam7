import React from "react";
import Card from "./Card";

const Feed = ({
  products,
  onLoad,
  error,
  totalPages,
  currentPage,
  setCurrentPage,
  showPagination,
  searchResults,
}) => {
  return (
    <>
      {onLoad && (
        <span className="block mx-auto loading loading-spinner mt-[50px] w-[225px] h-[225px]"></span>
      )}
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {error}.</span>
        </div>
      )}
      {products.length > 0 && !onLoad && (
        <>
          <ul className="grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-x-[36px] gap-y-[68px]">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </ul>
          <ul className="mt-[100px] block text-center">
            {showPagination && searchResults.length !== 0 && (
              <div className="join">
                {totalPages.map((page) => (
                  <button
                    key={page}
                    className={
                      page === currentPage
                        ? "join-item w-[26px] h-[19px] bg-green rounded-full font-inter text-[9px] font-bold leading-[11px] text-white"
                        : "join-item w-[26px] h-[19px] bg-slimGreen rounded-full font-inter text-[9px] font-bold leading-[11px] text-grren"
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </ul>
        </>
      )}
      {products.length === 0 && !error && !onLoad && (
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="font-bold text-[25px]">No products found</span>
        </div>
      )}
    </>
  );
};

export default Feed;
