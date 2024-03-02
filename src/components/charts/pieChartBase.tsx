import {useEffect} from "react";
import {Chart as ChartJS} from "chart.js/auto";
import colorListGen from "@/utils/colorListGen.ts";
import {Pie} from "react-chartjs-2";

interface pieChartDatasetInterface {
    labels: string[],
    data: number[],
}

const PieChartBase = ({startColor, endColor, dataset}: {
    startColor: string,
    endColor: string,
    dataset: pieChartDatasetInterface
}) => {
    useEffect(() => {
        ChartJS.register({
            id: 'arc',
            beforeDraw: chart => {
                // Check if chart data and datasets are defined
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                if (chart?.data?.datasets?.length > 0 && chart.data.datasets[0]._meta?.length > 0) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
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
        length: dataset.labels.length,
        startColor: startColor,
        endColor: endColor,
        opacity: 0.5
    });
    const borderColor = colorListGen({
        length: dataset.labels.length,
        startColor: startColor,
        endColor: endColor,
        opacity: 1
    });

    const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);
    const labels: string[] = dataset.labels.map((label, i) =>
        `${label} (${dataset.data[i]}) - ${Math.round((dataset.data[i] / sum(dataset.data)) * 100)}%`
    );
    const data = {
        labels: labels,
        datasets: [
            {
                data: dataset.data,
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

export default PieChartBase;