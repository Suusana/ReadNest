import { BorrowRecordHeader } from "@/assets/staticData";
import Alert from "@/components/Alert";
import Pagination from "@/components/Pagination";
import RecordsPerPage from "@/components/RecordsPerPage";
import TableHeader from "@/components/tableHeader";
import usePage from "@/hooks/usePage";
import useSelection from "@/hooks/useSelection";
import useSearch from "@/hooks/useSerch";
import { fetchRecords, searchRecords } from "@/service/recordService";
import { RecordRoot } from "@/types/record";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Borrowing = () => {
  const [Data, setData] = useState<RecordRoot>();
  const { Page, setPage, PageSize, setPageSize, Total, setTotal } = usePage();
  const totalPages = Math.ceil(Total / PageSize);
  const { changePage } = useSelection(Data?.records || [], (record) => record.recordId);

  const [Status, setStatus] = useState('');
  const [SearchDate, setSearchDate] = useState({
    startDate: '',
    endDate: ''
  });

  const {
    SearchItem, setSearchItem,
    prevSearchItem, setPrevSearchItem,
    noResult, setNoResult
  } = useSearch();
  const [ErrorDate, setErrorDate] = useState(false);
  const navigate = useNavigate();

  const loadRecords = async () => {
    try {
      const res = await fetchRecords(Page, PageSize);
      const Total = res.data.data.total; //total records
      setTotal(Total)
      setData({ records: res.data.data.rows })
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  const search = async () => {
    const res = await searchRecords(
      Page, PageSize, SearchItem,
      SearchDate.startDate, SearchDate.endDate, Status)
    if (res.data.code === 0) {
      setNoResult(true)
    } else {
      const Total = res.data.data.total; //total records
      setTotal(Total)
      setData({ records: res.data.data.rows })
    }
  }

  useEffect(() => {
    if (SearchItem.trim() === '' && prevSearchItem.trim() !== '') {
      // when the search bar become empty,then reload all the books data
      loadRecords();
    }
    setPrevSearchItem(SearchItem);
  }, [SearchItem]);

  useEffect(() => {
    if (SearchItem.trim() === '') {
      loadRecords();
    } else {
      search()
    }
  }, [Page, PageSize])

  const handleSearchClick = async () => {
    await setPage(1);
    search()
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    if (SearchDate.endDate && new Date(newStartDate) > new Date(SearchDate.endDate)) {
      setErrorDate(true);
    } else {
      setSearchDate((prev) => ({
        ...prev,
        startDate: newStartDate
      }))
    }
  }
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (SearchDate.startDate && new Date(newEndDate) < new Date(SearchDate.startDate)) {
      setErrorDate(true);
    } else {
      setSearchDate((prev) => ({
        ...prev,
        endDate: newEndDate
      }))
    }
  }

  const viewDetail = (id: number) => {
    navigate(`/admin/detail/${id}`);
  };

  return (
    <div className="p-4">
      {noResult && <Alert content="There is no result" alertType="alert-error" onClose={() => setNoResult(false)} />}
      {ErrorDate && <Alert content="The date you are setting is wrong" alertType="alert-error" onClose={() => setErrorDate(false)} />}
      <div>
        <h1 className="text-4xl font-bold mb-5">Borrowing Records</h1>
        <div className="flex justify-between space-x-2 mb-4">
          <RecordsPerPage PageSize={PageSize} Total={Total} setPageSize={setPageSize} />

          {/* Search bar */}
          <div className='flex items-center space-x-2'>
            <div className="form-control mb-4">
              <span className="label-text">Status</span>
              <select
                className="select select-bordered select-info w-full max-w-xs"
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option></option>
                <option value={0}>Borrowed</option>
                <option value={1}>Returned</option>
                <option value={2}>Overdue</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <span className="label-text">Start Date</span>
              <input
                type="date"
                className="input input-bordered input-info"
                value={SearchDate.startDate}
                onChange={handleStartDate}
              />
            </div>

            <div className="form-control mb-4">
              <span className="label-text">End Date</span>
              <input
                type="date"
                className="input input-bordered input-info"
                value={SearchDate.endDate}
                onChange={handleEndDate}
              />
            </div>
            <div className="form-control mb-4">
              <span className="label-text">Search</span>
              <input
                type="text"
                placeholder="Enter username or book"
                value={SearchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs" />
            </div>
            <button
              onClick={() => handleSearchClick()}
              className="btn btn-primary ">Search</button>
          </div>
        </div>

        <table className="table table-zebra w-full table-fixed">
          <TableHeader headers={BorrowRecordHeader} showCheckbox={false} />
          <tbody>
            {Data?.records.map((record) => (
              <tr key={record.recordId}>
                <th className="w-16"></th>
                <th className="overflow-hidden text-ellipsis whitespace-nowrap" >{record.recordId}</th>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap" >{record.username}</td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap" >{record.bookName}</td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap" >{dayjs(record.borrowDate).format("YYYY-MM-DD")}</td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap" >{dayjs(record.DueDate).format("YYYY-MM-DD")}</td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap" >
                  {dayjs(record.returnDate).format("YYYY-MM-DD") === "Invalid Date" ?
                    "Haven't Return" : dayjs(record.returnDate).format("YYYY-MM-DD")}
                </td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap" >
                  {record.status === 0 ? "Borrowed" : record.status === 1 ? "Returned" : "Overdue"}
                </td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap" >
                  <button
                    onClick={() => viewDetail(record.recordId)}
                    className="btn btn-outline btn-success mr-3">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <Pagination Page={Page} totalPages={totalPages} setPage={setPage} changePage={changePage} />
      </div>
    </div>
  );
}

export default Borrowing;