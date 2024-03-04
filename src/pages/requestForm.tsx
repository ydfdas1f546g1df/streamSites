import React, {useEffect, useRef} from "react";



const RequestForm = () => {
    const [allCategories, setAllCategories] = React.useState<{ pk_categories: number, name: string }[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);
    const iconRef = useRef<HTMLInputElement>(null);
    const languagesRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(`${import.meta.env.VITE_API_URL}/categories`)
            .then((res) => res.json())
            .then((data) => {
                setAllCategories(data.data);
            });
    }, []);

    const handleSubmit = () => {
        const name = nameRef.current?.value;
        const url = urlRef.current?.value;
        const icon = iconRef.current?.value;
        const languages = languagesRef.current?.value.split(",").map((lang) => lang.trim());
        const category = allCategories[categoryRef.current?.selectedIndex as number].name;
        console.log(name, url, icon, languages, category);
        
        if (!name || !url || !icon || !languages || !category) {
            alert("Please Fill All Fields");
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(`${import.meta.env.VITE_API_URL}/sites/request`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    name: name,
                    url: url,
                    icon: icon,
                    languages: languages,
                    category: category,
                }
            }),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.message === "success") {
                alert("Site Requested Successfully");
                iconRef.current!.value = "";
                nameRef.current!.value = "";
                urlRef.current!.value = "";
                languagesRef.current!.value = "";
            } else {
                alert("Site Request Failed, Please Try Again Later.");
            }
        });
    }

    return (
        <div
            style={{minHeight: "calc(100vh - 12rem)"}}
            className={"flex justify-center items-center"}
        >
            <div
                className={"flex flex-col gap-4 p-8 rounded-md border-[1px] border-darkgray-700"}
            >

                <div
                    className={"flex justify-between items-center p-4 "}
                >
                    <div
                        className={"flex gap-4 items-center"}
                    >
                        <h2
                            className={"text-2xl font-bold"}
                        >
                            Request Site
                        </h2>
                    </div>
                    <div
                        className={"flex gap-2"}
                    >
                        <button
                            onClick={handleSubmit}
                            className={"px-2 py-1 bg-darkgray-0 hover:bg-darkgray-50 text-darkgray-900 transition-all duration-300 ease-in-out cursor-pointer rounded font-semibold"}
                        >
                            Request Site
                        </button>
                    </div>
                </div>
                <div
                    className={"grid grid-cols-3 grid-rows-2 gap-4 p-4"}
                >
                    <div
                    className={"group"}
                    >
                        <label
                            htmlFor={"name"}
                            className={"block"}
                        >
                            Site Name
                        </label>
                        <input
                            placeholder={"example.com"}
                            required={true}
                            ref={nameRef}
                            type={"text"}
                            id={"name"}
                            className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
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
                            placeholder={"https://example.com"}
                            ref={urlRef}
                            required={true}
                            type={"text"}
                            id={"url"}
                            className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
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
                                placeholder={"https://example.com/favicon.ico"}
                                ref={iconRef}
                                required={true}
                                type={"text"}
                                id={"icon"}
                                className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                                onChange={
                                    (e) => {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        imageRef.current.src = e.target.value;
                                    }
                                }
                            />
                        </label>
                        <img
                            ref={imageRef}
                            src={""}
                            className={"w-16 h-16"} alt={"ico"}/>
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
                            required={true}
                            id={"category"}
                            className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                        >
                            {
                                allCategories.map((category: { pk_categories: number, name: string }) => (
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
                            placeholder={"us, de, jp ..."}
                            ref={languagesRef}
                            required={true}
                            type={"text"}
                            id={"languages"}
                            className="w-full p-2 rounded-md bg-darkgray-800 disabled:text-darkgray-100 text-darkgray-50 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestForm;
