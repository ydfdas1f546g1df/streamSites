import {useEffect, useMemo, useState} from "react";
import AsideElement from "@/components/asideElement.tsx";
import CategoriesElement from "@/components/categoriesElement.tsx";
import FilterMenuElement from "@/components/filterMenuElement.tsx";
import SiteInterface from "@/interfaces/siteInterface.ts";
import CategoriesInterface from "@/interfaces/categoriesInterface.ts";



const Root = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [data, setData] = useState<SiteInterface[]>([]);
    const [categories, setCategories] = useState<string[]>(["Loading..."]);
    const [languages, setLanguages] = useState<string[]>(["Loading..."]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const apiurl = useMemo(() => import.meta.env["VITE_API_URL"], []);

    useEffect(() => {
        const fetchData = async (url: string, methode: string) => {
            const response = await fetch(url, {
                method: methode,
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            return result.data;
        };

        const promises = [
            fetchData(apiurl + "/api/sites", "POST"),
            fetchData(apiurl + "/api/categories", "GET")
        ];

        Promise.all(promises)
            .then(([sitesData, categoriesData]) => {
                const tmpLanguages = sitesData.map((site: SiteInterface) => site.languages).flat().filter((value: string, index: number, self: string[]) => self.indexOf(value) === index).sort();
                const tmpCategories = categoriesData.map((category: CategoriesInterface) => category.name).sort();
                setLanguages(tmpLanguages);
                setCategories(tmpCategories);
                setSelectedCategories(tmpCategories);
                setSelectedLanguages(tmpLanguages);
                setData(sitesData);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [apiurl]);

    const filteredData = useMemo(() => {
        return data.filter(site =>
            (site.languages.length === 0 || site.languages.some(language => selectedLanguages.includes(language)))
            && selectedCategories.includes(site.category)
        ).filter(site => site.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [data, selectedLanguages, selectedCategories, searchQuery]);

    const categoriesedData = useMemo(() => {
        const tempCategoriesedData: { [key: string]: SiteInterface[] } = {};
        filteredData.forEach(site => {
            if (tempCategoriesedData[site.category] === undefined) {
                tempCategoriesedData[site.category] = [site];
            } else {
                tempCategoriesedData[site.category].push(site);
            }
        });
        return tempCategoriesedData;
    }, [filteredData]);


    const sortedCategoriesedData = useMemo(() => {
        const sortedData = {...categoriesedData};
        const sortedKeys = Object.keys(sortedData).sort();
        return sortedKeys.reduce((acc, key) => ({...acc, [key]: sortedData[key]}), {});
    }, [categoriesedData]);

    return (
        <div className="flex gap-4 justify-center overflow-hidden h-full">
            <AsideElement categories={categories} sites={sortedCategoriesedData}/>
            <div className="flex-1 overflow-hidden min-h-screen" style={{
                maxHeight: "calc(100vh - 8rem)",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
            }}>
                <CategoriesElement categories={sortedCategoriesedData}/>
            </div>
            <FilterMenuElement
                searchQueryHandler={setSearchQuery}
                selectedLanguagesHandler={setSelectedLanguages}
                selectedCategoriesHandler={setSelectedCategories}
                selectedLanguages={selectedLanguages}
                selectedCategories={selectedCategories}
                languages={languages}
                categories={categories}
            />
        </div>
    );
};

export default Root;
