import AsideElement from "@/components/asideElement.tsx";
import CategoriesElement from "@/components/categoriesElement.tsx";
import FilterMenuElement from "@/components/filterMenuElement.tsx";
import getLanguages from "@/utils/getLanguages.ts";
import getCategories from "@/utils/getCategories.ts";
import {useState} from "react";
import SiteInterface from "@/interfaces/siteInterface.ts";
import data from "@/data/data.json";

const root = () => {
    const languages: string[] = getLanguages();
    const categories: string[] = Object.keys(getCategories());
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(languages);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);

    // language and category filter
    const filteredData: SiteInterface[] = data.filter((site) => {
        if (site.languages.length === 0 && selectedCategories.includes(site.category)) {
            return true;
        }
        return site.languages.some((language) => selectedLanguages.includes(language)) && selectedCategories.includes(site.category);
    });
    // search query filter
    const filteredData2: SiteInterface[] = filteredData.filter((site) => {
        return site.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const categoriesedData: { [key: string]: SiteInterface[] } = {};

    filteredData2.forEach((site) => {
        if (categoriesedData[site.category] === undefined) {
            categoriesedData[site.category] = [];
        }
        categoriesedData[site.category].push(site);
    });

    // sort the categories
    Object.keys(categoriesedData).sort().forEach((key) => {
        const value = categoriesedData[key];
        delete categoriesedData[key];
        categoriesedData[key] = value;
    });

    // sort the sites in each category
    Object.keys(categoriesedData).forEach((category) => {
        categoriesedData[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return (
        <div className="flex gap-4 justify-center overflow-hidden h-full">
            <AsideElement/>
            <div className="flex-1 overflow-hidden min-h-screen" style={{
                maxHeight: "calc(100vh - 8rem)",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
            }}>
                <CategoriesElement
                    categories={categoriesedData}
                />
            </div>
            <FilterMenuElement
                searchQueryHandler={setSearchQuery}
                selectedLanguagesHandler={setSelectedLanguages}
                selectedCategoriesHandler={setSelectedCategories}
                selectedLanguages={selectedLanguages}
                selectedCategories={selectedCategories}
            />
        </div>
    );
}
export default root;