import {useEffect, useState} from "react";
import SiteInterface from "@/interfaces/siteInterface.ts";
import TableElement from "@/components/tableElement.tsx";
import AdminEditRequestMenu from "@/components/adminEditRequestMenu.tsx";
import {useAuth} from "@/utils/auth.tsx";

const AdminSiteRequests = () => {
    const [data, setData] = useState<SiteInterface[]>([])
    const [position, setPosition] = useState(0);
    const [maxRows, setMaxRows] = useState(-1);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [tableSearchQuery, setTableSearchQuery] = useState<string>("");
    const steps = 10;
    const auth = useAuth()
    const token = auth.user?.token;

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(import.meta.env["VITE_API_URL"] + "/api/requests",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({start: position, end: position + steps, search: tableSearchQuery, token: token})
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setData(data.data);
                setMaxRows(data.count);
                setSelectedRow(null);
            });
    }, [maxRows, position, tableSearchQuery, token]);
    return (
        <>
            <div
                className="p-8 flex flex-col gap-4"
                style={{minHeight: "calc(100vh - 12rem)"}}
            >
                <div>

                    <input
                        type="text"
                        placeholder="Search for a requests..."
                        className="p-2 rounded-md bg-darkgray-800 text-darkgray-100 bg-transparent border-[1px] border-darkgray-700 ease-in-out duration-200 transition-colors focus:outline-none focus:border-darkgray-0"
                        onChange={(e) => setTableSearchQuery(e.target.value)}
                    />
                </div>
                <TableElement
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    data={data}
                    position={position}
                    setPosition={setPosition}
                    maxRows={maxRows}
                    steps={steps}
                    setSelectedRow={setSelectedRow}
                />
                <AdminEditRequestMenu
                    data={data.filter((site: { pk_sites: number }) => site.pk_sites === selectedRow)[0]}
                    setSelectedRow={setSelectedRow}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    setData={setData}
                    allData={data}
                    setMaxRows={setMaxRows}
                    maxRows={maxRows}
                />
            </div>
        </>
    );
}
export default AdminSiteRequests;