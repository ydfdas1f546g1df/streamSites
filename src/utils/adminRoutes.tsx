import {Navigate, Outlet} from "react-router-dom";

const AdminRoutes= () => {
    const auth = {token: false}
    return (
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    );
}

export default AdminRoutes;
