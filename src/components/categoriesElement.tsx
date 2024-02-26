import CategoryElement from "./categoryElement.tsx";
import SiteInterface from "@/interfaces/siteInterface.ts";

const CategoriesElement = ({categories}: { categories: { [key: string]: SiteInterface[] } }) => {
    return (
        <>
            {
                Object.keys(categories).length === 0 ? <h1 className={"text-center text-2xl font-semibold mt-4"}>No sites found</h1> :
                Object.keys(categories).map((category: string, index: number) => (
                    <CategoryElement
                        key={index}
                        sitesData={categories[category]}
                        categoryName={category}
                    />
                ))
            }
        </>
    )
}


export default CategoriesElement;
