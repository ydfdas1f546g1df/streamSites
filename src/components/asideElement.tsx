import getCategories from "@/utils/getCategories.ts";
import DropdownItem from "@/components/dropdownItem.tsx";

const AsideElement = () => {
    const categories = getCategories();


    return (
        <aside>
            <div className="w-72 p-4">
                <h2 className="text-darkgray-0 text-lg font-semibold">Categories</h2>
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
            </div>
        </aside>

    );
}
export default AsideElement;