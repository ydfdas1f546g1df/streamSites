import CategoryCountChart from "@/components/charts/categoryCountChart.tsx";
import getCategories from "@/utils/getCategories.ts";

const Dashboard = () => {
    const data = getCategories();


    return (
        <div
            className={"grid p-4 gap-4 grid-cols-4 grid-rows-3"}
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
                <CategoryCountChart
                    chartData={data}
                />
            </div>
        </div>
    );
};

export default Dashboard;
