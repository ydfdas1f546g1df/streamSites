import Footer from "@/components/footer.tsx";
import Header from "@/components/header.tsx";
import Root from "@/pages/root.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminRoutes from "@/utils/adminRoutes.tsx";
import AdminDashboard from "@/pages/adminDashboard.tsx";
import Login from "@/pages/login.tsx";
import RequestForm from "@/pages/requestForm.tsx";
import Dashboard from "@/pages/dashboard.tsx";
import {AuthProvider} from "@/utils/auth.tsx";
import AdminAllSitesTable from "@/pages/adminAllSitesTable.tsx";


function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="bg-darkgray-900 text-darkgray-0 font-inter accent-darkgray-0 min-h-screen">
                    <Header/>
                    <div className="pt-16"/>
                    <Routes>
                        <Route path="/" element={<Root/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/request"} element={<RequestForm/>}/>
                        <Route path={"/dashboard"} element={<Dashboard/>}/>
                        <Route element={<AdminRoutes/>}>
                            <Route path={"/admin"} element={<AdminDashboard/>}/>
                            <Route path={"/admin/sites"} element={<AdminAllSitesTable/>}/>
                        </Route>
                        <Route path={"/*"} element={<Root/>}/>
                    </Routes>
                    <div className="pb-16 bg-transparent"/>
                    <Footer/>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
