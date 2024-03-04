import {useState} from "react";
import SiteInterface from "@/interfaces/siteInterface.ts";
import {max} from "d3";

const TableElement = ({
                          data, position, setPosition, maxRows, steps, setSelectedRow
                      }: {
    data: never[],
    position: number,
    setPosition: (position: number) => void,
    maxRows: number,
    steps: number,
    setSelectedRow: (row: number) => void,
}) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortField === null) return 0;
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    if (maxRows === 0) {
        return (
            <div className="flex justify-center items-center m-auto">
                <h1 className="text-2xl text-darkgray-0 font-semibold">No results found</h1>
            </div>
        );
    }
    

    if (sortedData.length === 0) {
        return (
            <div className="flex justify-center items-center m-auto">
                <div className="animate-spin w-12 h-12 border-t-4 border-b-4 border-darkgray-700 rounded-full"/>
            </div>
        );
    }

    const upArrow = (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512"
             className="h-4 w-4 fill-current"
        >
            <path
                d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
        </svg>
    )

    const downArrow = (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512"
             className="h-4 w-4 fill-current"
        >
            <path
                d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
        </svg>
    )

    return (

        <div
            className={"overflow-auto border-[1px] border-darkgray-700 rounded"}
        >
            <table className="w-full">
                <thead className="bg-darkgray-800 text-darkgray-0">
                <tr>
                    {Object.keys(sortedData[0]).map((key, index) => (
                        <th key={index} onClick={() => handleSort(key)}
                            className="p-2 text-left cursor-pointer">
                            <span
                                className={"flex items-center"}
                            >
                                
                            {key}&nbsp;
                                {sortField === key ? (sortDirection === 'asc' ? upArrow : downArrow) :
                                    <div className={"w-4 aspect-square"}></div>}
                            </span>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {sortedData.map((row: SiteInterface, index: number) => (
                    <tr key={index}
                        className="border-b-[1px] border-darkgray-700 hover:bg-darkgray-700 text-darkgray-0 transition-all duration-300 ease-in-out cursor-pointer">
                        {Object.values(row).map((value, index) => (
                            <td
                                key={index}
                                className="p-2 h-11 text-left overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[10rem]"
                                onClick={() => setSelectedRow(row.pk_sites)}
                            >
                                {typeof value === "string" ? value : JSON.stringify(value)}
                            </td>
                        ))}
                    </tr>
                ))}
                {
                    Array.from({length: steps - sortedData.length}, (_, index) => (
                        <tr key={index} className="border-b-[1px] border-darkgray-700">
                            {Object.keys(sortedData[0]).map((_, index) => (
                                <td key={index} className="h-11 text-left"/>
                            ))}
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div
                className={"flex justify-center items-center bg-darkgray-800 text-darkgray-0"}
            >
                <button
                    onClick={() => setPosition(position - steps)}
                    className={"p-2 my-1 h-8 aspect-square rounded bg-darkgray-700 flex justify-center items-center mx-2 hover:bg-darkgray-600 text-darkgray-0 transition-all duration-300 ease-in-out cursor-pointer text-center"}
                    disabled={position === 0}
                >
                    &lt;
                </button>
                <span>
                    {position + 1} - {position + steps > maxRows ? maxRows : position + steps} of {maxRows}
                </span>
                <button
                    onClick={() => setPosition(position + steps)}
                    className={"p-2 my-1 h-8 aspect-square rounded bg-darkgray-700 flex justify-center items-center mx-2 hover:bg-darkgray-600 text-darkgray-0 transition-all duration-300 ease-in-out cursor-pointer text-center"}
                    disabled={position + steps >= maxRows}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default TableElement;
