import CategoryElement from "@/components/categoryElement.tsx";
import SiteInterface from "@/interfaces/siteInterface.ts";

const CategoriesElement = ({categories}: { categories: { [key: string]: SiteInterface[] } }) => {
    return (
        <>
            {
                Object.keys(categories).length === 0 ?
                    <div
                        className={"flex flex-col gap-4 items-center justify-center w-full ease-in-out duration-200 transition-colors mt-32 opacity-70"}
                    >
                        <h1 className={"text-center text-2xl font-semibold mt-4 text-darkgray-50"}>No sites found</h1>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-32 aspect-square text-darkgray-50 mx-auto mt-4 fill-darkgray-50"
                             viewBox="0 0 512 512">
                            <path
                                d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/>
                        </svg>
                    </div>
                    :
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
