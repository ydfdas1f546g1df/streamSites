// needs a group parent to work

const ToolTipBottomElement = ({toolTip}: { toolTip: string }) => {
    return (
        <div
            className="
    delay-50 scale-0 group-hover:scale-100 absolute bg-darkgray-0
    text-darkgray-900 p-2 rounded transition-all min-h-full
    border-darkgray-100 border-[1px]
    duration-300 ease-in-out transform z-10
    -bottom-1/4 left-1 -translate-x-1/2 translate-y-full
    text-[11px] whitespace-nowrap font-semibold shadow-md opacity-0 group-hover:opacity-100"
        >
            {toolTip}
            <span
                className="absolute w-3 aspect-square bg-darkgray-0 transform rotate-45 top-1 left-1/2 translate-x-1/2 -translate-y-1/2 rounded-sm"
            >
        </span>
        </div>
    )
}

export default ToolTipBottomElement;