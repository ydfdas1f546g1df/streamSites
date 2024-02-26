import getLanguages from "@/utils/getLanguages.ts";
import getCategories from "@/utils/getCategories.ts";
import FilterMenuElementInterface from "@/interfaces/filterMenuInterface.ts";


const FilterMenuElement = ({
                               searchQueryHandler,
                               selectedLanguagesHandler,
                               selectedCategoriesHandler,
                               selectedLanguages,
                               selectedCategories
                           }: FilterMenuElementInterface) => {
    const languages = getLanguages();
    const categories = getCategories();

    return (
        <div
            className={"p-4"}
        >
            <div>
                <input
                    type="text"
                    placeholder="Search for stream sites"
                    className="w-full p-2 rounded-md bg-darkgray-800 text-darkgray-100 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                    onChange={(e) => searchQueryHandler(e.target.value)}
                />
            </div>
            <div>
                <h3 className={"font-semibold mt-6 pb-1 border-b-[1px] pl-2 border-b-darkgray-700 mb-2"}>Languages</h3>
                {
                    languages.map((language: string, index: number) => (
                        <div
                            key={index}
                            className="flex gap-2 pl-2 mt-2 items-center"
                        >
                            <input
                                className={"h-4 aspect-square"}
                                type="checkbox"
                                id={language}
                                name={language}
                                value={language}
                                checked={selectedLanguages.includes(language)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        selectedLanguagesHandler([...selectedLanguages, e.target.value]);
                                    } else {
                                        selectedLanguagesHandler(selectedLanguages.filter((lang) => lang !== e.target.value));
                                    }
                                }}
                            />
                            <label
                                htmlFor={language}>
                                <img
                                    className={"h-4 text-ellipsis"}
                                    src={"https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/" + language + ".png"}
                                    alt={language}/></label>
                        </div>

                    ))
                }
            </div>
            <div>
                <h3 className={"font-semibold mt-6 pb-1 border-b-[1px] pl-2 border-b-darkgray-700 mb-2"}>Categories</h3>
                <div>
                    {
                        Object.keys(categories).map((category: string, index: number) => (
                            <div
                                key={index}
                                className="flex gap-2 pl-2 mt-2 items-center text-darkgray-100 ease-in-out duration-200 transition-colors hover:text-darkgray-50"
                            >
                                <input
                                    className={"h-4 aspect-square"}
                                    type="checkbox"
                                    id={category}
                                    name={category}
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={
                                        (e) => {
                                            if (e.target.checked) {
                                                selectedCategoriesHandler([...selectedCategories, e.target.value]);
                                            } else {
                                                selectedCategoriesHandler(selectedCategories.filter((cat) => cat !== e.target.value));
                                            }
                                        }
                                    }
                                />
                                <label htmlFor={category}>{category}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FilterMenuElement;
