import DropdownItem from "@/components/dropdownItem.tsx";
import SiteInterface from "@/interfaces/siteInterface.ts";

const AsideElement = (
    {
        categories,
        sites
    }: {
        categories: string[],
        sites: { [key: string]: SiteInterface[] }
    }
) => {
    return (
        <div className={"h-full flex flex-col"}>
            <div className="w-72 p-4">
                <h3 className="text-darkgray-0 font-semibold pb-1 border-b-[1px] pl-2 border-b-darkgray-700 mb-2">Categories</h3>
                <ul className="mt-4">
                    {
                        categories.map((category: string, index: number) => (
                            <DropdownItem
                                key={index}
                                categoryName={category}
                                sitesData={sites[category]}
                            />
                        ))
                    }
                </ul>
                <h3 className="text-darkgray-0 font-semibold py-1 pt-2 border-b-[1px] pl-2  border-b-darkgray-700 mb-2">Jump</h3>
                <ul
                    className={"mt-4"}
                >
                    {categories.map((category: string, index: number) => (
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