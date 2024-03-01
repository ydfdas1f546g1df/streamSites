import SiteInterface from "@/interfaces/siteInterface.ts";
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import {useEffect} from 'react';
import colorListGen from "@/utils/colorListGen.ts";


const CategoryCountChart = ({chartData}: { chartData: { [key: string]: SiteInterface[] } }) => {
    const categoriesCount: { count: number, category: string }[] = [];

    console.log(chartData)
    Object.keys(chartData).forEach((category) => {
        categoriesCount.push({count: chartData[category].length, category: category.toUpperCase()});
    });

    useEffect(() => {
        ChartJS.register({
            id: 'arc',
            beforeDraw: chart => {
                // Check if chart data and datasets are defined
                if (chart?.data?.datasets?.length > 0 && chart.data.datasets[0]._meta?.length > 0) {
                    const vm = chart.getViewMeta(chart.data.datasets[0]._meta[0]);
                    const {x, y} = vm.center;
                    const radius = vm.radius[0];
                    const ctx = chart.ctx;
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.restore();
                }
            }

        });
    }, []);

    const bgColors = colorListGen({
        length: categoriesCount.length,
        startColor: "#ff0038",
        endColor: "#00ffff",
        opacity: 0.5
    });
    const borderColor = colorListGen({
        length: categoriesCount.length,
        startColor: "#ff0038",
        endColor: "#00ffff",
        opacity: 1
    });
    console.log(borderColor)


    const data = {
        labels: categoriesCount.map((item) => {
            return item.category + ` (${item.count})` + " " + Math.round((item.count / categoriesCount.reduce((acc, curr) => acc + curr.count, 0)) * 100) + "%";
        }),
        datasets: [
            {
                data: categoriesCount.map((item) => item.count),
                borderWidth: 1,
                backgroundColor: bgColors,
                borderColor: borderColor,
                responsive: true,
            },
        ],
    };
    return (
        <div
            className={"flex justify-center items-center h-full relative w-full"}
            style={{height: "calc(100vh - 12rem)"}}
        >
            <Pie
                data={data}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "right",
                        },
                        tooltip: {
                            displayColors: false,
                        }
                    },
                }}
            />
        </div>
    );
}

export default CategoryCountChart;
