import { UsersHeaders } from "@/assets/staticData";
import Pagination from "@/components/Pagination";
import RecordsPerPage from "@/components/RecordsPerPage";
import TableHeader from "@/components/tableHeader";
import usePage from "@/hooks/usePage";
import useSelection from "@/hooks/useSelection";
import { fetchUsers } from "@/service/userService";
import { RootUser } from "@/types/user";
import { useEffect, useState } from "react";

const UserManage = () => {
  const [Data, setData] = useState<RootUser>(); // all the categories info
  const {Page, setPage, PageSize, setPageSize, Total, setTotal } = usePage();
  const totalPages = Math.ceil(Total / PageSize);
  
  const {changePage} = useSelection(Data?.users || [],(user) => user.userId);

  //loading users
  const loadData = async () => {
    try {
      const res = await fetchUsers(Page, PageSize);
      
      const Total = res.data.data.total; //total records
      setTotal(Total)
      setData({ users: res.data.data.rows })
    } catch (err) {
      console.error("Fail to load users:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-5">Users Management</h1>
      <div className="flex justify-between space-x-2 mb-4">
        <RecordsPerPage PageSize={PageSize} Total={Total} setPageSize={setPageSize} />

      </div>
      <table className="table table-zebra w-full table-fixed">
        <TableHeader headers={UsersHeaders} showCheckbox={false} />
        <tbody>
          {Data?.users.map((user) => (
            <tr key={user.userId}>
              <th className="w-16" >
              </th>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" >
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={user.avatar}/>
                </div>
              </td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={user.username}>{user.username}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={user.name}>{user.name}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={user.email}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination Page={Page} totalPages={totalPages} setPage={setPage} changePage={changePage} />
    </div>
  );
}

export default UserManage