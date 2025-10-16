import React from 'react'
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPress }) => {
    const handlePageClick = (data) => {
        onPress(data.selected + 1)
    };
    
    return (
        <div
            style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                border: "2px solid rgba(102, 126, 234, 0.1)",
                display: "inline-block",
            }}
        >
            <ReactPaginate
                breakLabel="..."
                nextLabel="التالي ←"
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="← السابق"
                containerClassName={"pagination justify-content-center mb-0"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
            <style jsx>{`
                .pagination .page-link {
                    border-radius: 12px !important;
                    margin: 0 4px;
                    border: 2px solid rgba(102, 126, 234, 0.2);
                    color: #667eea;
                    font-weight: 600;
                    padding: 8px 12px;
                    transition: all 0.3s ease;
                }
                .pagination .page-link:hover {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-color: #667eea;
                    transform: translateY(-2px);
                }
                .pagination .page-item.active .page-link {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-color: #667eea;
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                }
            `}</style>
        </div>
    )
}

export default Pagination
