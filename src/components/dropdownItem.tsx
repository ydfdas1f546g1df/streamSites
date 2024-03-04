import {useState} from "react";
import SiteInterface from "@/interfaces/siteInterface.ts";


const DropdownItem = ({ categoryName, sitesData }: { categoryName: string, sitesData: SiteInterface[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between cursor-pointer"
            >
                <p
                    className="text-darkgray-100 hover:bg-darkgray-700 rounded px-2 py-1 w-full flex items-center cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={"h-6 w-6 text-darkgray-100 transition-transform transform " + (isOpen ? "rotate-90" : "")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                    {categoryName}
                </p>
            </div>
            <ul
                className={"ease-in-out duration-200"}
                style={{
                    maxHeight: isOpen ? '100%' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out'
                }}
            >
                {isOpen &&
                    sitesData.map((element: SiteInterface, subIndex: number) => (
                        <li
                            key={subIndex}
                            className="ml-4 flex items-center gap-4 p-1 pl-2 hover:bg-darkgray-700 ease-in-out duration-200 transition-colors rounded"
                        >
                            <img
                                src={element.icon}
                                alt={element.name}
                                className="w-4 aspect-square"
                            />
                            <a
                                href={`${element.url}`}
                                target={"_blank"}
                                className="text-darkgray-300 hover:text-darkgray-100">{element.name}</a>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default DropdownItem;