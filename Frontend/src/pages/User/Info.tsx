import Reminder from "@/components/reminder";
import { clearUserInfo } from "@/store/user";
import { RootState } from "@/types/user";
import { closeDialog, openModal } from "@/utils/uiInteract";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from '@/assets/UserAvatar.png'
import { useRef, useState } from "react";
import { updatePassword, uploadAvatar } from "@/service/userService";
import Alert from "@/components/Alert";

const Info = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string>(user.avatar || Avatar);
  const [password, setPassword] = useState({
    passwd: '',
    comPasswd: ''
  });
  const [empty, setEmpty] = useState({
    passwd: false,
    comPasswd: false
  });
  const [showAlert, setShowAlert] = useState<string>("");
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);

  const Logout = () => {
    dispatch(clearUserInfo())
    navigate("/")
  }

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const res = await uploadAvatar(file, user.userId);
        setAvatar(res.data.data);
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        e.target.value = "";
      }
    }
  };

  const change = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.passwd) {
      setEmpty((pre) => ({ ...pre, passwd: true }));
    }
    if (!password.comPasswd) {
      setEmpty((pre) => ({ ...pre, comPasswd: true }));
      return;
    }

    if (password.passwd === password.comPasswd) {
      try{
        await updatePassword(password.passwd, user.userId);
        setChangeSuccess(true);
      } catch(err){
        console.log("Upload failed", err)
      }

      setPassword({
        passwd: "",
        comPasswd: ""
      })
      setEmpty({
        passwd: false,
        comPasswd: false
      })
      setShowAlert("")
      closeDialog("changePassword");
    } else {
      setShowAlert("Your password does not match")
    }
  };

  const cancel = () => {
    setPassword({
      passwd: "",
      comPasswd: ""
    })
    setEmpty({
      passwd: false,
      comPasswd: false
    })
    setShowAlert("")
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white h-screen mx-auto px-6 py-2">

      {changeSuccess && <Alert content="Change password successfully" alertType="alert-success" onClose={() => setChangeSuccess(false)} />}
      <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto mb-8 md:mb-0">
        <div
          onClick={handleAvatarClick}
          className="avatar flex justify-center my-4">
          <div
            className="w-48 h-48 rounded-full ring ring-blue-300 ring-offset-2">
            <img src={avatar} alt="User Avatar" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* User Info */}
        <h2 className="text-xl font-semibold text-blue-600 mb-2 text-center sm:text-left">{user.username} </h2>
        <p className="text-gray-700 mb-2 text-center sm:text-left">ID: {user.userId} </p>
        <p className="text-gray-700 mb-2 text-center sm:text-left">Email: {user.email} </p>
        <p className="text-gray-700 mb-4 text-center sm:text-left">Full Name: {user.name} </p>

        {/* Buttons */}
        <div className="flex flex-col mb-4 space-y-4">
          <button
            onClick={() => openModal("changePassword")}
            className="btn btn-primary w-full">Change Password</button>
          <button
            onClick={() => openModal("logout")}
            className="btn btn-secondary w-full">Log Out</button>
        </div>

        <Reminder id="logout" title="Log Out Reminder" content="Are you sure you want to log out?" onClick={Logout} />

        {/* change Password */}
        <dialog id="changePassword" className="modal">
          <div className="modal-box space-y-4">
            <h3 className="font-bold text-lg">Change your password</h3>
            <label className="form-control">
              <span className="label-text mb-2 text-md">Password</span>
              <input
                value={password.passwd}
                onChange={(e) => setPassword((pre) => ({ ...pre, passwd: e.target.value }))}
                onClick={() => { setEmpty({ ...empty, passwd: false }); setShowAlert("") }}
                type="password" placeholder="Enter your new Password"
                className="input input-bordered" />
            </label>
            <span className={`text-red-700 text-sm ${empty.passwd ? 'visible' : 'invisible'}`}>
              Please enter your password
            </span>
            <label className="form-control">
              <span className="label-text mb-2 text-md">Comfirm Password</span>
              <input
                value={password.comPasswd}
                onChange={(e) => setPassword((pre) => ({ ...pre, comPasswd: e.target.value }))}
                onClick={() => { setEmpty({ ...empty, comPasswd: false }); setShowAlert("") }}
                type="password" placeholder="Comfirm your new Password"
                className="input input-bordered" />
            </label>
            <span className={`text-red-700 text-sm  ${empty.comPasswd ? 'visible' : 'invisible'}`}>
              Please comfirm your password
            </span><br />
            <span className={`text-red-700 text-sm ${showAlert ? 'visible' : 'invisible'}`}>
              {showAlert}
            </span>
            <div className="modal-action">
              <form method="dialog">
                <button
                  onClick={(e) => change(e)}
                  className="btn btn-primary">Comfirm</button>
                <button
                  onClick={() => cancel()}
                  className="btn ml-5">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>

  );
}

export default Info;