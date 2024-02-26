import CategoryElement from "./categoryElement.tsx";
import getCategories from "../utils/getCategories.ts";

const CategoriesElement = () => {
    const categories = getCategories();

    return (
        <>
            {
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
