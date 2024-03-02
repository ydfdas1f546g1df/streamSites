import SiteInterface from "@/interfaces/siteInterface.ts";
import {useEffect, useState} from 'react';
import formatData from "@/utils/formatData.ts";
import PieChartBase from "@/components/charts/pieChartBase.tsx";



const CategoryCountChart = () => {
    const [chartData, setChartData] = useState<{ [key: string]: SiteInterface[] }>({});
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(import.meta.env["VITE_API_URL"] + "/sites",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChartData(formatData(data.data));
            });
    }, []);
    
    const labels: string[] = Object.keys(chartData)
    const data: number[] = Object.values(chartData).map((value) => value.length);
    
    return (
        <PieChartBase startColor={"#fa6868"} endColor={"#75f3ff"} dataset={{
            labels: labels,
            data: data
        }} />
    );
}

export default CategoryCountChart;
