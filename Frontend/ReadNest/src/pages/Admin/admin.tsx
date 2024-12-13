import { RootState } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";
import Svg from "@/components/svg";
import huhCat from "@/assets/huhCat.jpg"

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearUserInfo } from "@/store/user";

import { CardList, menuList } from "@/assets/staticData";
import { openModal } from "@/utils/uiInteract";
import Reminder from "@/components/reminder";

const Admin = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname)
  const path = location.pathname;

  const goToPage = (path: string) => {
    navigate("/admin" + path)
  }

  // logout function
  const Logout = () => {
    dispatch(clearUserInfo())
    navigate("/login")
  }


  return <div>
    <div className="flex h-screen">
      {/* left menu */}
      
      <ul className="menu text-base gbg-base-200 w-56 bg-slate-300 flex flex-col gap-2 fixed top-0 left-0 h-screen z-10">
        {/* admin info */}
        <div className="avatar mx-auto grid grid-cols-1 mt-10">

          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img src={huhCat} />
          </div>
          <p className="text-2xl font-bold my-4 mx-auto">{user.username}</p>
        </div>

        {/* menu list */}
        {menuList.map((item) => (
          <li onClick={() => goToPage(item.key)} key={item.key}>
            <p className={path === ("/admin" + item.key) ? "active" : ""}>
              <Svg Link={item.icon} />
              {item.label}
            </p>
          </li>
        ))};

        {/* logout button */}
        <li className="mt-auto">
          <button
            onClick={() => openModal("logout")}
            className="btn btn-accent">Logout</button>
        </li>

        {/* the popup */}
        <Reminder id="logout" title="Log Out Reminder" content="Are you sure you want to log out?" onClick={Logout}/>
      </ul>

      {/* right content */}
      <div className="flex-1 p-4 ml-56">
        {path === "/admin" ?
          <div className="collapse bg-cyan-100">
            <div
              className="bg-primary text-secondary-content text-center py-5">
              <p className="text-5xl font-bold text-center">ReadNest</p>
              Your Intelligent Library Management System
            </div>

            <p className="text-5xl font-bold mx-5 mt-3 text-teal-700 mb-10">Strat your work</p>
            {/* cards */}
            <div className="flex flex-wrap justify-evenly space-x-16" >
              {CardList.map((item) => (
                <div className="card bg-base-100 w-1/4 shadow-xl mb-10" key={item.key}>
                  <figure>
                    <img
                      src={item.link}
                      alt={item.link} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.content}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary" onClick={() => goToPage(item.key)}>START</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          :
          <Outlet />}
      </div>
    </div>
  </div>;
}

export default Admin