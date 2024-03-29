import React, {useState} from "react";
import {useAuth} from "@/utils/auth.tsx";
import {Navigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAuth()


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        auth?.login({username, password})
    }
    if (auth?.user) {
        return <Navigate to={"/admin"}/>
    }

    return (
        <div
            className={"flex justify-center items-center"}
            style={{minHeight: "calc(100vh - 12rem)"}}
        >
            <form
                onSubmit={handleLogin}
                className={"flex flex-col gap-4 p-4 rounded w-96 border-darkgray-700 border-[1px]"}
            >
                <h2
                    className={"text-2xl font-bold text-center"}
                >
                    Admin Login
                </h2>
                <div
                    className={"relative"}
                >
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={"w-full p-2 pt-4 bg-darkgray-900 rounded border-darkgray-700 border-[1px] peer"}
                        minLength={3}

                    />
                    <label
                        htmlFor="username"
                        className={
                            "absolute text-l top-1/2 -translate-y-1/2 font-semibold " +
                            "left-2 bg-transparent px-1 peer-focus:text-xs " +
                            "peer-focus:top-3 ease-in-out transition-all dureation-400 peer-focus:left-1 " +
                            "text-darkgray-200 " + (username === "" ? "" : "top-3 left-1 text-xs")}
                    >Username</label>
                </div>
                <div
                    className={"relative"}

                >
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={"w-full p-2 pt-4 bg-darkgray-900 rounded border-darkgray-700 border-[1px] peer invalid:border-red-500"}
                        minLength={3}
                    />
                    <label
                        className={
                            "absolute text-l top-1/2 -translate-y-1/2 font-semibold " +
                            "left-2 bg-transparent px-1 peer-focus:text-xs " +
                            "peer-focus:top-3 ease-in-out transition-all dureation-400 peer-focus:left-1 " +
                            "text-darkgray-200 " + (password === "" ? "" : "top-3 left-1 text-xs")}
                        htmlFor="password"
                    >Password</label>
                </div>
                <input
                    type="submit"
                    className={
                        "p-2 rounded cursor-pointer font-semibold " +
                        "transition-all duration-600 ease-in-out " +
                        " disabled:cursor-not-allowed " + (username === "" || password === "" ? "bg-darkgray-800 text-darkgray-200" : "bg-darkgray-50 hover:bg-darkgray-0 text-darkgray-900")
                    }
                    disabled={username === "" || password === ""}
                    value={"Login"}
                />
            </form>
        </div>
    )
}

export default Login;