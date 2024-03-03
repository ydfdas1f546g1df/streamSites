import {useEffect, useState} from "react";
import SiteInterface from "@/interfaces/siteInterface.ts";
import PieChartBase from "@/components/charts/pieChartBase.tsx";

const SitesWithLanguageCountChart = () => {
    const [chartData, setChartData] = useState<SiteInterface[]>([]);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(import.meta.env["VITE_API_URL"] + "/sites",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChartData(data.data);
            });
    }, []);
    const languages = chartData.map((site) => site.languages).flat();
    const languageCount = languages.reduce<{ [key: string]: number }>((acc, curr) => ({
        ...acc,
        [curr]: (acc[curr] || 0) + 1
    }), {});
    return (
        <PieChartBase startColor={"#fddb37"} endColor={"#a733de"} dataset={
            {
                labels: Object.keys(languageCount),
                data: Object.values(languageCount)
            }
        }/>
    );
}

export default SitesWithLanguageCountChart;