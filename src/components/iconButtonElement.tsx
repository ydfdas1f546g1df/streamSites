import Element = React.JSX.Element;
import ToolTipElement from "@/components/toolTipElement.tsx";

const IconButtonElement = ({url, svgElement, toolTip, newTab}: { url: string, svgElement: Element, toolTip: string, newTab: boolean }) => {
    return (
        <a
            href={url}
            target={newTab ? "_blank" : "_self"}
            className="mr-2 flex flex-col items-center justify-between"
        >
            <div
                className="group relative">
                <button
                    className={`hover:bg-darkgray-700 text-darkgray-0 p-2 rounded-md transition-all duration-300 ease-in-out transform group-hover:scale-110 relative`}
                >
                    {svgElement}
                    <ToolTipElement
                        toolTip={toolTip}
                    />
                </button>
            </div>
        </a>
    )
}

export default IconButtonElement;