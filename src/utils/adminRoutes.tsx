import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

const AdminRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const userItem = sessionStorage.getItem("user");
    const {
        username,
        token
    } = userItem ? JSON.parse(userItem) : {username: null, token: null};
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(`${import.meta.env.VITE_API_URL}/admin/session`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({token: token, username: username}),
        }).then((res) => {
                return res.json();
            }
        ).then((data) => {
            if (data.valid) {
                sessionStorage.setItem("user", JSON.stringify({username: username, token: token}));
                setIsAuthenticated(true);
            }
            setIsAuthenticating(false);
        });
    }, [username, token]);

    return (
        <>
            {
                isAuthenticating ? (
                //     make a rotating spinner that looks like a rotating cube
                    <div
                        className={"flex justify-center items-center"}
                        style={{minHeight: "calc(100vh - 12rem)"}}
                    >
                        <div
                            className={"animate-spin w-12 h-12 border-t-4 border-b-4 border-darkgray-700 rounded-full"}
                        />
                    </div>
                ) : (
                    isAuthenticated ? (
                        <Outlet/>
                    ) : (
                        <Navigate to={"/login"}/>
                    )
                )
            }
        </>
    );
}

export default AdminRoutes;
