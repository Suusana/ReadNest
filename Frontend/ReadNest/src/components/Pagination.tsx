import { PageType } from "@/types/staticData";

const Pagination: React.FC<PageType> = ({ Page, setPage,changePage,totalPages}) => {
    return (
        <div className="join flex justify-center mt-4">
            <button
                onClick={() => { Page === 1 ? "" : setPage(Page - 1); changePage() }}
                className={`join-item btn btn-outline ${Page === 1 ? 'btn-disabled' : ''}`}>Previous</button>

            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        onClick={() => { setPage(page); changePage() }}
                        className={`join-item btn btn-outline ${Page === page ? "btn-active" : ""
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => { Page === totalPages ? "" : setPage(Page + 1); changePage() }}
                className={`join-item btn btn-outline ${Page === totalPages ? 'btn-disabled' : ''}`}>Next</button>
        </div>
    );
}

export default Pagination