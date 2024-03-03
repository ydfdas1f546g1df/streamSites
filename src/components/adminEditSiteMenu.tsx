import {useEffect, useRef, useState} from "react";
import siteInterface from "@/interfaces/siteInterface.ts";

const AdminEditSiteMenu = ({dataset, setSelectedRow, setData, allData}: {
    dataset: siteInterface,
    setSelectedRow: (row: number | null) => void
    setData: (data: siteInterface[]) => void
    allData: siteInterface[]
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [categories, setCategories] = useState([]);
    const imageRef = useRef(new Image())
    const iconRef = useRef<HTMLInputElement>(null)
    const languagesRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const urlRef = useRef<HTMLInputElement>(null)


useEffect(() => {
    setIsEditing(false);
    if (iconRef.current) iconRef.current.value = dataset.icon
    if (languagesRef.current) languagesRef.current.value = dataset.languages?.join(", ")
    if (categoryRef.current) categoryRef.current.selectedIndex = categories.findIndex((category: { pk_categories: number, name: string }) => category.name === dataset.category)
    if (nameRef.current) nameRef.current.value = dataset.name
    if (urlRef.current) urlRef.current.value = dataset.url
}, [categories, dataset]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(`${import.meta.env["VITE_API_URL"]}/categories`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategories(data.data);
            });
    }, []);

    if (dataset === undefined) {
        return (
            <div
                className={"flex justify-center items-center h-96"}
            >
                <p
                    className={"text-2xl font-semibold"}
                >
                    No site selected
                </p>
            </div>
        )
    }
    const handleSave = () => {
        const formData = {
            pk_sites: 0,
            name: nameRef.current?.value,
            url: urlRef.current?.value,
            icon: iconRef.current?.value,
            category: categoryRef.current?.value,
            languages: languagesRef.current?.value.split(",").map((language: string) => language.trim())
        }
        console.log(formData)
        if (dataset.pk_sites === 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // fetch(import.meta.env["VITE_API_URL"] + "/sites/add",
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(formData)
            //     })
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((data) => {
            //         console.log(data)
            //     });
        } else {
            formData.pk_sites = dataset.pk_sites
            const index = allData.findIndex((site: siteInterface) => site.pk_sites === dataset.pk_sites)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            allData[index] = formData
            setData(allData)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // fetch(import.meta.env["VITE_API_URL"] + "/sites/edit",
            //     {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(formData)
            //     })
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((data) => {
            //         console.log(data)
            //     });
        }
    }

    const handleDelete = () => {

    }

    return (
        <div
            className={"flex flex-col gap-4 border-[1px] border-darkgray-700 rounded mt-8"}
        >
            <div
                className={"flex justify-between items-center p-4 "}
            >
                <span
                    className={"text-left overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[10rem]"}
                >
                    PK: {dataset.pk_sites}
                </span>
                <div
                    className={"flex gap-2"}
                >
                    {
                        !isEditing ?
                            <button
                                onClick={() => setIsEditing(true)}
                                className={"px-2 py-1 bg-blue-500 hover:bg-blue-400 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                            >
                                Edit
                            </button> : null
                    }
                    {
                        isEditing ?
                            <button
                                onClick={() => {
                                    if (isEditing) handleSave()
                                    setIsEditing(false)
                                }}
                                className={"px-2 py-1 bg-green-700 hover:bg-green-600 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                            >
                                Save
                            </button> : null
                    }
                    {
                        isEditing ?
                            <button
                                onClick={() => {
                                    setSelectedRow(null)
                                    setIsEditing(false)
                                }}
                                className={"px-2 py-1 bg-orange-600 hover:bg-orange-500 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                            >
                                Cancel
                            </button> : null
                    }
                    {
                        <button
                            onClick={handleDelete}
                            className={"px-2 py-1 bg-red-700 hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                        >
                            Delete
                        </button>
                    }
                </div>
            </div>
            <div
                className={"grid grid-cols-3 grid-rows-2 gap-4 p-4"}
            >
                <div>
                    <label
                        htmlFor={"name"}
                        className={"block"}
                    >
                        Site Name
                    </label>
                    <input
                        type={"text"}
                        id={"name"}
                        className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                        defaultValue={dataset.name}
                        disabled={!isEditing}
                        ref={nameRef}
                    />
                </div>
                <div>
                    <label
                        htmlFor={"url"}
                        className={"block"}
                    >
                        Site URL
                    </label>
                    <input
                        ref={urlRef}
                        type={"text"}
                        id={"url"}
                        className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                        defaultValue={dataset.url}
                        disabled={!isEditing}
                    />
                </div>
                <div
                    className={"row-span-2 flex justify-start flex-col gap-4"}
                >
                    <label
                        htmlFor={"icon"}
                        className={"block"}
                    >
                        Site Icon
                        <input
                            ref={iconRef}
                            type={"text"}
                            id={"icon"}
                            className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                            defaultValue={dataset.icon}
                            onChange={
                                () => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    imageRef.current.src = iconRef.current?.value
                                }
                            }
                            disabled={!isEditing}
                        />
                    </label>
                    <img
                        ref={imageRef}
                        src={dataset.icon}
                        alt={dataset.name}
                        className={"w-16 h-16"}/>
                </div>
                <div>
                    <label
                        htmlFor={"category"}
                        className={"block"}
                    >
                        Site Category
                    </label>
                    <select
                        ref={categoryRef}
                        id={"category"}
                        className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                        defaultValue={dataset.category}
                        disabled={!isEditing}
                    >
                        {
                            categories.map((category: { pk_categories: number, name: string }) => (
                                <option
                                    key={category.pk_categories}
                                    value={category.pk_categories}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label
                        htmlFor={"languages"}
                        className={"block"}
                    >
                        Site Languages
                    </label>
                    <input
                        ref={languagesRef}
                        type={"text"}
                        id={"languages"}
                        className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                        defaultValue={dataset.languages?.join(", ")}
                        disabled={!isEditing}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminEditSiteMenu;