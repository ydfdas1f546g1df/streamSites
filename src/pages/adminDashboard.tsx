import dashboardSVG from "@/components/svg/dashboardSVG.tsx";
import {Link} from "react-router-dom";
import tableSVG from "@/components/svg/tableSVG.tsx";


const AdminDashboard = () => {
    const linkElement = (url: string, svgElement: JSX.Element, name:string) => {
        return (
            <Link
                to={url}
                className={"min-h-40 flex flex-col items-center justify-center aspect-square rounded hover:bg-darkgray-800 transition-all duration-300 ease-in-out cursor-pointer border-[1px] border-darkgray-700"}
            >
                {svgElement}
                <p
                    className={"text-darkgray-0 font-semibold mt-4"}
                >{name}</p>
            </Link>
        )
    }

    return (
        <>
            <div
                style={{minHeight: "calc(100vh - 12rem)"}}
                className={"flex p-4 gap-4 h-full overflow-hidden items-start content-start"}
            >
                <div
                    className={"grid grid-cols-2 gap-2 grid-rows-2 items-center border-darkgray-700 border-[1px] rounded-md p-2 aspect-square"}
                >
                    {linkElement("/dashboard", dashboardSVG(6), "Dashboard")}
                    {linkElement("/admin/sites", tableSVG(6), "Edit Sites")}
                    {linkElement("/", dashboardSVG(6), "Users")}
                    {linkElement("/admin/requests", dashboardSVG(6), "Site Requests")}

                </div>
            </div>
        </>
    );
}

export default AdminDashboard;