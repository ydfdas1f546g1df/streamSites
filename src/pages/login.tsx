import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const api_base = import.meta.env.VITE_API_URL

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        // send post request to /admin/login
        const response = await fetch(`${api_base}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const data = await response.json();
        console.log(data);
    }


return (
    <div
        className={"flex justify-center items-center"}
        style={{height: "calc(100vh - 12rem)"}}
    >
        <form
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
                onSubmit={handleLogin}
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