import CategoriesElement from '@/components/categoriesElement';
import Header from "@/components/header.tsx";
import AsideElement from "@/components/asideElement.tsx";
import Footer from "@/components/footer.tsx";
import FilterMenuElement from "@/components/filterMenuElement.tsx";
import {useState} from "react";
import data from "@/data/data.json";
import getLanguages from "@/utils/getLanguages.ts";
import SiteInterface from "@/interfaces/siteInterface.ts";
import getCategories from "@/utils/getCategories.ts";


function App() {
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
        <div className="bg-darkgray-900 text-darkgray-0 font-inter accent-darkgray-0 min-h-screen">
            <Header/>
            <div className="pt-16"></div>
            <div className="flex gap-4 justify-center overflow-hidden">
                <AsideElement/>
                <div className="flex-1 overflow-hidden min-h-screen" style={{
                    maxHeight: "calc(100vh - 20px)",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                }}>
                    <CategoriesElement
                        categories={categoriesedData}
                    />
                    <div className="pb-20"></div>
                </div>
                <FilterMenuElement
                    searchQueryHandler={setSearchQuery}
                    selectedLanguagesHandler={setSelectedLanguages}
                    selectedCategoriesHandler={setSelectedCategories}
                    selectedLanguages={selectedLanguages}
                    selectedCategories={selectedCategories}
                />
            </div>
            <Footer/>
        </div>
    );

}

export default App;
