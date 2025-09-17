import { fetchDetail } from "@/service/recordService";
import { Detail } from "@/types/record";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const [Data, setData] = useState<Detail | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetchDetail(id);
      setData(res.data.data)
    } catch (error) {
      console.error("fail:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="p-4">
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-primary mr-80"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Borrowing Record Detail</h1>
      </div>

      <div className="flex flex-1">
        <div className="w-1/3 flex justify-center items-center">
          <img
            src={Data?.cover}
            alt="Book Cover"
            className="w-80 h-[480px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-2/3 flex flex-col justify-between p-6">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{Data?.bookName}</h1>
            <div
              className="text-lg text-gray-500 mt-2 max-h-24 overflow-y-auto"
              style={{ wordBreak: 'break-word' }}>
              {Data?.description}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-md text-gray-500">Author</p>
                <p className="font-medium text-lg">{Data?.author}</p>
              </div>
              <div>
                <p className="text-md text-gray-500">Category</p>
                {Data?.tags && Data?.tags.map((tag, index) => (
                  <div key={index}
                  className="badge badge-primary badge-outline p-4 mr-2">
                    <p className="font-medium text-lg">{tag}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-md text-gray-500">Borrow Date</p>
                <p className="font-medium text-lg">{dayjs(Data?.borrowDate).format("YYYY-MM-DD")}</p>
              </div>
              <div>
                <p className="text-md text-gray-500">Due Date</p>
                <p className="font-medium text-lg">{dayjs(Data?.DueDate).format("YYYY-MM-DD")}</p>
              </div>
              <div>
                <p className="text-md text-gray-500">Return Date</p>
                <p className="font-medium text-lg text-red-500">
                  {dayjs(Data?.returnDate).format("YYYY-MM-DD") === "Invalid Date" ?
                    "Haven't Return" : dayjs(Data?.returnDate).format("YYYY-MM-DD")}
                </p>
              </div>
              <div>
                <p className="text-md text-gray-500">Status</p>
                <p className="badge badge-info text-lg p-4">
                  {Data?.status === 0 ? "Borrowed" : Data?.status === 1 ? "Returned" : "Overdue"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 mt-10">
            <img
              src={Data?.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full shadow-md"
            />
            <div>
              <p className="font-bold text-xl">{Data?.username}</p>
              <p className="text-gray-500 text-lg">{Data?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage