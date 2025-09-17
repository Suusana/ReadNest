import { Record } from "@/types/record";
import { http } from "@/utils";

export const fetchRecords = async (
    Page: number, PageSize: number,
    setTotal: (Total: number) => void,
    setData: (data: { records: Record[] }) => void,
) => {
    try {
        const res = await http.get("/api/recordsData", {
            params: {
                page: Page,
                pageSize: PageSize
            }
        });
        const Total = res.data.data.total; //total records
        setTotal(Total)
        setData({ records: res.data.data.rows })
    } catch (error) {
        console.error("Error fetching records:", error);
    }
};

//when searching records
export const searchRecords = async (
    Page: number, PageSize: number,
    SearchItem: string, startDate: string, endDate: string, status: string,
    setNoResult: (noResult: boolean) => void,
    setTotal: (Total: number) => void,
    setData: (data: { records: Record[] }) => void
) => {
    const res = await http.get("/api/searchRecords", {
        params: {
            page: Page,
            pageSize: PageSize,
            status: status,
            SearchItem: SearchItem,
            startDate: startDate,
            endDate: endDate
        }
    });
    console.log(res.data)
    if (res.data.code === 0) {
        setNoResult(true)
    } else {
        const Total = res.data.data.total; //total records
        setTotal(Total)
        setData({ records: res.data.data.rows })
    }
}

export const fetchDetail = async (recordId: string | undefined) => {
    try {
        const res = await http.get("/api/fetchRecord", {
            params: {
                recordId: recordId
            }
        });
        console.log("kanwo:", res.data.data)
        return res.data.data
    } catch (error) {
        console.error("Error fetching record data:", error);
    }
};