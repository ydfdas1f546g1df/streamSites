import {useEffect, useRef, useState} from "react";
import SiteInterface from "@/interfaces/siteInterface.ts";
import {useAuth} from "@/utils/auth.tsx";

const AdminEditSiteMenu = ({data, setSelectedRow, setData, allData, setMaxRows, maxRows}: {
    data: SiteInterface,
    setSelectedRow: (row: number | null) => void
    setData: (data: (SiteInterface | {
        languages: string[] | undefined;
        pk_sites: number;
        name: string;
        icon: string;
        category: string;
        url: string
    })[]) => void
    allData: SiteInterface[]
    setMaxRows: (maxRows: number) => void
    maxRows: number
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [categories, setCategories] = useState<{ pk_categories: number, name: string }[]>([]);
    const imageRef = useRef(new Image())
    const iconRef = useRef<HTMLInputElement>(null)
    const languagesRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const urlRef = useRef<HTMLInputElement>(null)
    const [dataset, setDataset] = useState<SiteInterface | undefined>(data);
    const auth = useAuth();


    useEffect(() => {
        setIsEditing(false)
        if (dataset?.pk_sites !== 0 || data?.pk_sites !== 0 && data?.pk_sites !== undefined) {
            setDataset(data)
        }
        if (iconRef.current) iconRef.current.value = dataset?.icon as string
        if (languagesRef.current) languagesRef.current.value = dataset?.languages?.join(", ") as string
        if (categoryRef.current) categoryRef.current.selectedIndex = categories.findIndex((category: {
            pk_categories: number,
            name: string
        }) => category.name === dataset?.category)
        if (nameRef.current) nameRef.current.value = dataset?.name as string
        if (urlRef.current) urlRef.current.value = dataset?.url as string
        //console.log(dataset)
    }, [categories, dataset, data]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(`${import.meta.env["VITE_API_URL"]}/api/categories`,
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

    if (maxRows === 0) {
        return
    }
    
    if (dataset === undefined) {
        return (
            <div
                className={"flex justify-center items-center m-auto flex-col gap-4"}
            >
                <p
                    className={"text-2xl font-semibold"}
                >
                    No request selected
                </p>
            </div>
        )
    }
    const handleApprove = () => {
        const formData = {
            pk_sites: 0,
            name: nameRef.current?.value,
            url: urlRef.current?.value,
            icon: iconRef.current?.value,
            category: categories[categoryRef.current?.selectedIndex as number].name,
            languages: languagesRef.current?.value.split(",").map((language: string) => language.trim())
        }
        if (formData.name === "" || formData.url === "" || formData.icon === "" || formData.category === "") return
        if (formData.languages?.map((language: string) => language.length !== 2).includes(true)) return
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(`${import.meta.env["VITE_API_URL"]}/api/sites/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data: formData, token: auth.user?.token})
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                if (data.message === "success") {
                    removeRequest(dataset.pk_sites)
                    setData(allData.filter((site: { pk_sites: number }) => site.pk_sites !== dataset.pk_sites) as SiteInterface[] | [])
                }
            });
    }

    const handleDecline = () => {
        if (!confirm("Are you sure you want to delete this request?")) return
        removeRequest(dataset.pk_sites)
    }

    const removeRequest = (pk_sites: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(`${import.meta.env["VITE_API_URL"]}/api/request/remove`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({pk_site_requests: pk_sites, token: auth.user?.token})
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setSelectedRow(null)
                setIsEditing(false)
                setMaxRows(maxRows - 1)
            });
    }

    return (
        <div
            className={"flex flex-col gap-4 border-[1px] border-darkgray-700 rounded mt-8"}
        >
            <div
                className={"flex justify-between items-center p-4 "}
            >
                <div
                    className={"flex gap-4 items-center"}
                >
                    <button
                        onClick={() => setSelectedRow(null)}
                        className={"px-2 py-1 text-darkgray-900 bg-darkgray-0 hover:bg-darkgray-50 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                    >
                        close
                    </button>
                    <span
                        className={"text-left overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[10rem]"}
                    >
                    PK: {dataset?.pk_sites}
                </span>
                </div>
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
                    <button
                        onClick={() => {
                            handleApprove()
                        }}
                        className={"px-2 py-1 bg-green-700 hover:bg-green-600 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                    >
                        Approve
                    </button>
                    {
                        <button
                            onClick={handleDecline}
                            className={"px-2 py-1 bg-red-700 hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                        >
                            Decline
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
                        defaultValue={dataset?.name}
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
                        defaultValue={dataset?.url}
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
                            defaultValue={dataset?.icon}
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
                        src={dataset?.icon}
                        alt={dataset?.name}
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
                        defaultValue={dataset?.category}
                        disabled={!isEditing}
                    >
                        {
                            categories.map((category: { pk_categories: number, name: string }) => (
                                <option
                                    key={category.pk_categories}
                                    value={category.pk_categories}
                                    className={"bg-darkgray-800 text-darkgray-50"}
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
                        defaultValue={dataset?.languages?.join(", ")}
                        disabled={!isEditing}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminEditSiteMenu;