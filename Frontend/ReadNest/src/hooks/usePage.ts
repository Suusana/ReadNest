import { useState } from "react";

const usePage = () => {
    const [Page, setPage] = useState<number>(1); // the current page
    const [PageSize, setPageSize] = useState<number>(5); // records per page
    const [Total, setTotal] = useState<number>(0); // total records

    return { Page, setPage, PageSize, setPageSize, Total, setTotal };
};

export default usePage;