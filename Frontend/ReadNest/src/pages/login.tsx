import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginFun } from '@/service/loginService'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [msg, setMsg] = useState<string>("");

    const loginhandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setMsg("You should not enter empty value");
            return
        }
        LoginFun(email, password, dispatch, setMsg, navigate);
    }

    return (
        <div>
            <div className="w-screen h-screen bg-[url('@/assets/LoginBackground.png')] bg-cover bg-center flex items-center justify-center" >
                <div>
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-indigo-600 font-bold mb-10" >
                        ReadNest
                    </p>
                    < form onSubmit={loginhandle} className="grid grid-cols-1 gap-1 max-w-sm mx-auto" >
                        <label htmlFor="email" className="text-xl md:text-2xl text-blue-950 font-semibold md:my-4" >
                            Email
                        </label>
                        < input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setMsg("")}
                            placeholder="Please enter your email"
                            className="input text-lg input-bordered input-info md:w-104 md:text-2xl lg:w-104 lg:text-xl"
                        />


                        <label htmlFor="password" className="text-xl md:text-2xl text-blue-950 font-semibold md:my-4" >
                            Password
                        </label>

                        < input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setMsg("")}
                            placeholder="Please enter your password"
                            className="input text-lg input-bordered input-info md:w-104 md:h-18 md:text-2xl lg:w-104 lg:text-xl"
                        />

                        {/* error message */}
                        <p className="text-red-600 font-medium h-6">{msg}</p>

                        <button
                            type="submit"
                            className="btn btn-active btn-accent text-xl md:text-2xl">
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/signup")}
                            className="btn btn-active btn-info text-xl md:text-2xl mt-2">
                            Signup
                        </button>
                    </form>

                </div>
            </div>
        </div >
    );
};

export default Login;

