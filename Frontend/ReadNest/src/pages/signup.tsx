import { AuthState } from "@/types/user";
import { Register } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterFun } from "@/service/loginService";

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const ChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [id]: value
        }))

        dispatch(Register({ field: id as keyof AuthState, value }));
    }

    const signup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            setMsg("You should not enter empty value");
            return;
        } else if (formData.password !== formData.confirmPassword) {
            setMsg("The password does not match");
            return;
        }
        RegisterFun(formData, setMsg, dispatch, navigate);
    }

    return <div>
        <div className="w-screen h-screen bg-[url('@/assets/LoginBackground.png')] bg-cover bg-center flex items-center justify-center" >
            <div >
                <p className="text-4xl md:text-6xl lg:text-7xl text-indigo-600 font-bold mb-10" >
                    Create Account
                </p>

                < form onSubmit={signup} className="grid grid-cols-1 gap-1 max-w-sm mx-auto" >
                    <label htmlFor="username" className="text-lg md:text-2xl text-blue-950 font-semibold" >
                        Username
                    </label>
                    < input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={(e) => ChangeEvent(e)}
                        onFocus={() => setMsg("")}
                        placeholder="Please enter your username"
                        className="input text-lg input-bordered input-info md:w-104 md:text-2xl lg:w-104 lg:text-xl"
                    />
                    <label htmlFor="name" className="text-lg md:text-2xl text-blue-950 font-semibold" >
                        Full Name
                    </label>
                    < input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => ChangeEvent(e)}
                        onFocus={() => setMsg("")}
                        placeholder="Please enter your full name"
                        className="input text-lg input-bordered input-info md:w-104 md:text-2xl lg:w-104 lg:text-xl"
                    />
                    <label htmlFor="email" className="text-lg md:text-2xl text-blue-950 font-semibold" >
                        Email
                    </label>
                    < input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => ChangeEvent(e)}
                        onFocus={() => setMsg("")}
                        placeholder="Please enter your email"
                        className="input text-lg input-bordered input-info md:w-104 md:text-2xl lg:w-104 lg:text-xl"
                    />
                    <label htmlFor="password" className="text-lg md:text-2xl text-blue-950 font-semibold" >
                        Password
                    </label>
                    < input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => ChangeEvent(e)}
                        onFocus={() => setMsg("")}
                        placeholder="Please enter your password"
                        className="input text-lg input-bordered input-info md:w-104 md:h-18 md:text-2xl lg:w-104 lg:text-xl"
                    />
                    <label htmlFor="confirmPassword" className="text-lg md:text-2xl text-blue-950 font-semibold" >
                        Comfirm Password
                    </label>
                    < input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => ChangeEvent(e)}
                        onFocus={() => setMsg("")}
                        placeholder="Comfirm your password"
                        className="input text-lg input-bordered input-info md:w-104 md:h-18 md:text-2xl lg:w-104 lg:text-xl"
                    />


                    {/* error message */}
                    <p className="text-red-600 font-medium h-6">{msg}</p>

                    <button
                        type="submit"
                        className="btn btn-active btn-accent text-xl md:text-2xl">
                        Signup
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="btn btn-active btn-info text-xl md:text-2xl mt-2">
                        Login
                    </button>
                </form>

            </div>
        </div>
    </div>;
}


export default Signup