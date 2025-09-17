import { fetchUserRecords } from "@/service/userService";
import { userRecordRoot } from "@/types/record";
import { RootState } from "@/types/user";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Borrow = () => {
  const user = useSelector((state: RootState) => state.user);
  const [Data, setData] = useState<userRecordRoot>({ userRecords: [] });

  const fetchData = async () => {
    try {
      const result = await fetchUserRecords(user.username);
      console.log("resule:", result)
      if (result) {
        setData(result);
      }
    } catch (error) {
      console.error("fail:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="bg-gradient-to-b h-screen mx-auto px-6 py-2">
      {Data && Data.userRecords ? (Data.userRecords.map((detail) => (
        <div className="pb-16" key={detail.recordId}>
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div key={detail.recordId}>
              <div className="flex items-center p-4">
                <img
                  className="w-24 h-36 object-cover rounded-md"
                  src={detail.cover}
                  alt="Book Cover"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{detail.bookName}</h2>
                  <p className="text-sm text-gray-600 max">
                    {detail.author}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {detail.tags.map((tag) => (
                      <span className="badge badge-primary" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="text-sm text-gray-700 mb-2">
                  <p>Borrow ID: <span className="font-medium">{detail.recordId}</span></p>
                  <p>Borrow Date: <span className="font-medium">{dayjs(detail.borrowDate).format("YYYY-MM-DD")}</span></p>
                  <p>Due Date: <span className="font-medium">{dayjs(detail.DueDate).format("YYYY-MM-DD")}</span></p>
                </div>
                <p className="text-sm text-gray-800 font-medium">
                  Status: <span className="mr-28">{detail.status === 0 ? 'Borrowed' : detail.status === 2 ? 'Overdue' : 'Returned'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>)
      )) : (<>There is no record</>)}
    </div>
  );
}

export default Borrow;