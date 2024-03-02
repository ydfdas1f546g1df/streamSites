import CategoryCountChart from "@/components/charts/categoryCountChart.tsx";
import SitesWithLanguageCountChart from "@/components/charts/sitesWithLanguageCountChart.tsx";

const Dashboard = () => {


    return (
        <div
            className={"grid p-4 gap-4 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 h-full overflow-hidden md:grid-cols-2 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-2"}
            style={{height: "calc(100vh - 12rem)"}}
        >
            <div
                className={"flex flex-col items-center border-darkgray-700 border-[1px] rounded-md p-2"}
            >
                <h2
                    className={"text-2xl font-bold text-darkgray-50 mb-4"}
                >
                    Sites by Category
                </h2>
                <CategoryCountChart/>
            </div>
            <div
                className={"flex flex-col items-center border-darkgray-700 border-[1px] rounded-md p-2"}
            >
                <h2
                    className={"text-2xl font-bold text-darkgray-50 mb-4"}
                >
                    Sites by Language
                </h2>
                <SitesWithLanguageCountChart/>
            </div>
        </div>
    );
};

export default Dashboard;
