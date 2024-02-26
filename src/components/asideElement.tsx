import getCategories from "@/utils/getCategories.ts";
import DropdownItem from "@/components/dropdownItem.tsx";

const AsideElement = () => {
    const categories = getCategories();


    return (
        <div className={"h-full flex flex-col"}>
            <div className="w-72 p-4">
                <h3 className="text-darkgray-0 font-semibold pb-1 border-b-[1px] pl-2 border-b-darkgray-700 mb-2">Categories</h3>
                <ul className="mt-4">
                    {Object.keys(categories).map((category: string, index: number) => (
                        <li
                            key={index}
                        >
                            <DropdownItem
                                categoryName={category}
                                sitesData={categories[category]}
                            />
                        </li>
                    ))}
                </ul>
                <h3 className="text-darkgray-0 font-semibold pb-1 border-b-[1px] pl-2 border-b-darkgray-700 mb-2">Jump</h3>
                <ul
                    className={"mt-4"}
                >
                    {Object.keys(categories).map((category: string, index: number) => (
                        <li
                            className={"text-darkgray-100 hover:bg-darkgray-700 rounded px-2 py-1 w-full flex items-center cursor-pointer"}
                            key={index}
                        >
                            <a href={"#" + category}>{category}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
export default AsideElement;