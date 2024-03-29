import Element = React.JSX.Element;
import ToolTipBottomElement from "@/components/toolTipBottomElement.tsx";
import {Link} from "react-router-dom";

const IconButtonElement = ({url, svgElement, toolTip, newTab}: { url: string, svgElement: Element, toolTip: string, newTab: boolean }) => {
    
    return (
        <Link
            to={url}
            target={newTab ? "_blank" : "_self"}
            className="mr-2 flex flex-col items-center justify-between"
        >
            <div
                className="group relative">
                <button
                    className={`hover:bg-darkgray-700 text-darkgray-0 p-2 rounded-md transition-all duration-300 ease-in-out transform group-hover:scale-110 relative`}
                >
                    {svgElement}
                    <ToolTipBottomElement
                        toolTip={toolTip}
                    />
                </button>
            </div>
        </Link>
    )
}

export default IconButtonElement;