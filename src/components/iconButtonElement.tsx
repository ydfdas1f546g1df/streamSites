import Element = React.JSX.Element;
import ToolTipElement from "@/components/toolTipElement.tsx";

const IconButtonElement = ({url, svgElement, toolTip}: { url: string, svgElement: Element, toolTip: string }) => {
    return (
        <a
            href={url}
            target={"_blank"}
            className="mr-2">
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