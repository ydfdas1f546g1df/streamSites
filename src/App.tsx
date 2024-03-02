import Footer from "@/components/footer.tsx";
import Header from "@/components/header.tsx";
import Root from "@/pages/root.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminRoutes from "@/utils/adminRoutes.tsx";
import AdminDashboard from "@/pages/adminDashboard.tsx";
import Login from "@/pages/login.tsx";
import RequestForm from "@/pages/requestForm.tsx";
import Dashboard from "@/pages/dashboard.tsx";


function App() {
    const location = window.location.href;
    const githubPages = location.includes("github.io/streamSites")
    return (
        <div className="bg-darkgray-900 text-darkgray-0 font-inter accent-darkgray-0 min-h-screen">
            <Header/>
            <div className="pt-16"/>
            <Router>
                <Routes>
                    <Route path="/" element={<Root/>}/>
                    <Route path={githubPages ? `/streamSites/login` : "/login"} element={<Login/>}/>
                    <Route path={githubPages ? `/streamSites/request` : "/request"} element={<RequestForm/>}/>
                    <Route path={githubPages ? `/streamSites/dashboard` : "/dashboard"} element={<Dashboard/>}/>
                    <Route element={<AdminRoutes/>}>
                        <Route path={githubPages ? `/streamSites/admin` : "/admin"} element={<AdminDashboard/>}/>
                    </Route>
                    <Route path={"/*"} element={<Root/>}/>
                </Routes>
            </Router>
            <div className="pb-16 bg-transparent"/>
            <Footer/>
        </div>
    );
}

export default App;
