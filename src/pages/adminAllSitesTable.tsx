import {useEffect, useState} from "react";
import TableElement from "@/components/tableElement.tsx";
import AdminEditSiteMenu from "@/components/adminEditSiteMenu.tsx";
import SiteInterface from "@/interfaces/siteInterface.ts";

const AdminAllSitesTable = () => {
    const [data, setData] = useState<SiteInterface[]>([])
    const [position, setPosition] = useState(0);
    const [maxRows, setMaxRows] = useState(0);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const steps = 10;
    
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetch(import.meta.env["VITE_API_URL"] + "/sites",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({start: position, end: position + steps})
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setData(data.data);
                setMaxRows(data.count);
                setSelectedRow(null);
            });
    }, [maxRows, position]);
    return (
        <>
            <div
                className="p-8"
                style={{minHeight: "calc(100vh - 12rem)"}}
            >
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
                <AdminEditSiteMenu
                    data={data.filter((site: { pk_sites: number }) => site.pk_sites === selectedRow)[0]}
                    setSelectedRow={setSelectedRow}
                    setData={setData}
                    allData={data}
                    setMaxRows={setMaxRows}
                    maxRows={maxRows}
                />
            </div>
        </>
    );
}

export default AdminAllSitesTable;