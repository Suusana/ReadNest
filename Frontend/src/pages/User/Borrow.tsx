import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "@/types/user";
import { userRecordRoot } from "@/types/record";
import { fetchUserRecords } from "@/service/userService";

const Borrow = () => {
  const user = useSelector((state: RootState) => state.user);
  const [Data, setData] = useState<userRecordRoot>({ userRecords: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchUserRecords(user.username);
      setData(res ?? { userRecords: [] });
    } catch (error) {
      console.error("fail:", error);
      setData({ userRecords: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.username]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!Data.userRecords || Data.userRecords.length === 0) return <div className="text-center py-10">There is no record</div>;

  return (
    <div className="bg-gradient-to-b h-screen mx-auto px-6 py-2">
      {Data?.userRecords && Data.userRecords.length > 0 ? (
        Data.userRecords.map((detail, index) => (
          <div className="pb-16" key={`${detail.recordId}-${index}`}>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex items-center p-4">
                <img
                  className="w-24 h-36 object-cover rounded-md"
                  src={detail.cover || '/default-cover.png'}
                  alt={detail.bookName}
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{detail.bookName}</h2>
                  <p className="text-sm text-gray-600">{detail.author || 'Unknown Author'}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(detail.tags || []).map((tag, tagIndex) => (
                      <span className="badge badge-primary" key={`${tag}-${tagIndex}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="text-sm text-gray-700 mb-2">
                  <p>
                    Borrow ID: <span className="font-medium">{detail.recordId}</span>
                  </p>
                  <p>
                    Borrow Date:{' '}
                    <span className="font-medium">
                      {detail.borrowDate ? dayjs(detail.borrowDate).format('YYYY-MM-DD') : '-'}
                    </span>
                  </p>
                  <p>
                    Due Date:{' '}
                    <span className="font-medium">
                      {detail.DueDate ? dayjs(detail.DueDate).format('YYYY-MM-DD') : '-'}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-gray-800 font-medium">
                  Status:{' '}
                  <span className="mr-28">
                    {detail.status === 0
                      ? 'Borrowed'
                      : detail.status === 2
                        ? 'Overdue'
                        : 'Returned'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>There is no record</div>
      )}
    </div>

  );
};

export default Borrow;
