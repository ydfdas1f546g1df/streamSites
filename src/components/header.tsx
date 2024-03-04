import IconButtonElement from "@/components/iconButtonElement.tsx";
import {useAuth} from "@/utils/auth.tsx";
import ToolTipBottomElement from "@/components/toolTipBottomElement.tsx";
import logoutSVG from "@/components/svg/logoutSVG.tsx";
import adminSVG from "@/components/svg/adminSVG.tsx";
import dashboardSVG from "@/components/svg/dashboardSVG.tsx";
import addSVG from "@/components/svg/addSVG.tsx";
import githubSVG from "@/components/svg/githubSVG.tsx";
import dataJsonSVG from "@/components/svg/dataJsonSVG.tsx";

const Header = () => {
    const auth = useAuth();





    return (
        <header>
            <div
                className="flex justify-between items-center border-b-[1px] border-darkgray-700 text-darkgray-0 p-4 fixed top-0 right-0 left-0 backdrop-blur">
                <a
                    className="text-2xl font-bold"
                    href={"/"}
                >StreamSites</a>
                <div className="flex">
                    <IconButtonElement
                        url={"https://github.com/ydfdas1f546g1df/streamSites/blob/b082cbe263e25399aa6b86f1a5ad7690f238aa4e/src/data/data.json"}
                        svgElement={dataJsonSVG(1)}
                        toolTip={"View data.json"}
                        newTab={true}
                    />
                    <IconButtonElement
                        url={"https://github.com/ydfdas1f546g1df/streamSites"}
                        svgElement={githubSVG(1)}
                        toolTip={"View on GitHub"}
                        newTab={true}
                    />
                    <IconButtonElement
                        url={"/request"}
                        svgElement={addSVG(1)}
                        toolTip={"Request new site"}
                        newTab={false}
                    />
                    <IconButtonElement
                        url={"/admin"}
                        svgElement={adminSVG(1)}
                        toolTip={"Admin Dashboard"}
                        newTab={false}
                    />
                    <IconButtonElement
                        url={"/dashboard"}
                        svgElement={dashboardSVG(1)}
                        toolTip={"Info Dashboard"}
                        newTab={false}
                    />

                    {
                        auth?.user?.token && (
                            <span
                                className="mr-2 flex flex-col items-center justify-between"
                            >
                                <div
                                    className="group relative">
                                    <button
                                        onClick={() => {
                                            auth?.logout();
                                        }}
                                        className={`hover:bg-darkgray-700 text-darkgray-0 p-2 rounded-md transition-all duration-300 ease-in-out transform group-hover:scale-110 relative`}
                                    >
                                        {logoutSVG(1)}
                                        <ToolTipBottomElement
                                            toolTip={"Logout"}
                                        />
                                    </button>
                                </div>
                            </span>
                        )
                    }
                </div>
            </div>
        </header>
    )
}


export default Header;