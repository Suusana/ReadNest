
import { RootState } from "@/types/user";
import { useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user);
  return <div>
    homepage
    welcome
    {user.name}
    {"your token is " + token}
  </div>;
}


export default Home