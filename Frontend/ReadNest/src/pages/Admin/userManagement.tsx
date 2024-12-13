import { UsersHeaders } from "@/assets/staticData";
import Pagination from "@/components/Pagination";
import RecordsPerPage from "@/components/RecordsPerPage";
import Reminder from "@/components/reminder";
import TableHeader from "@/components/tableHeader";
import usePage from "@/hooks/usePage";
import useSelection from "@/hooks/useSelection";
import { fetchUsers } from "@/service/userService";
import { RootState, RootUser, UserType } from "@/types/user";
import { openModal } from "@/utils/uiInteract";
import { useEffect, useState } from "react";

const UserManage = () => {
  const [Data, setData] = useState<RootUser | null>(null); // all the categories info
  const { Page, setPage, PageSize, setPageSize, Total, setTotal } = usePage();
  const totalPages = Math.ceil(Total / PageSize);
  // const {
  //   changePage
  // } = useSelection(
  //   Data?.categories || [], // 数据源
  //   (Category) => Category.categoryId // 唯一标识函数
  // );

  useEffect(() => {
    const data = fetchUsers(Page, PageSize);
    console.log(data)
    // const Total = res.data.data.total; //total records

    // setTotal(Total)
    // setData({ users: res.data.data.rows })
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-5">Users Management</h1>
      <div className="flex justify-between space-x-2 mb-4">
        <RecordsPerPage PageSize={PageSize} Total={Total} setPageSize={setPageSize} />

      </div>
      <table className="table table-zebra w-full table-fixed">
        <TableHeader headers={UsersHeaders} showCheckbox={false} />
        {/* <tbody>
          {Data?.categories.map((category) => (
            <tr key={category.categoryId}>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap text-center" title={category.category}>{category.category}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={category.description}>{category.description}</td>
              <td>
              <button
                  className="btn btn-outline btn-success mr-3">Edit</button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>

      {/* Pagination */}
      {/* <Pagination Page={Page} totalPages={totalPages} setPage={setPage} changePage={changePage} /> */}
    </div>
  );
}

export default UserManage