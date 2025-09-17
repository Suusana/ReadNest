import { http } from "@/utils";

export const fetchRecords = async (Page: number, PageSize: number,) => {
    return await http.get("/api/recordsData", {
        params: {
            page: Page,
            pageSize: PageSize
        }
    });
};

//when searching records
export const searchRecords = async (Page: number, PageSize: number, SearchItem: string, startDate: string, endDate: string, status: string) => {
    return await http.get("/api/searchRecords", {
        params: {
            page: Page,
            pageSize: PageSize,
            status: status,
            SearchItem: SearchItem,
            startDate: startDate,
            endDate: endDate
        }
    });
}

export const fetchDetail = async (recordId: string | undefined) => {
    return await http.get("/api/fetchRecord", {
        params: {
            recordId: recordId
        }
    });
};