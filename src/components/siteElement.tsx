import SiteInterface from "@/interfaces/siteInterface.ts";

const SiteElement = (site: SiteInterface) => {
    return (
        <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            className="border-darkgray-700 bg-darkgray-900 border-[1px] 
            hover:bg-darkgray-800 ease-in-out duration-200
            rounded h-36 aspect-square hover:text-darkgray-0 flex 
            flex-col items-center justify-between p-3 ">
            <img
                className={"h-12 mx-auto"}
                src={site.icon}
                alt={site.name}
            />
            <h3
                className="text-darkgray-50 text-center font-bold text-lg pb-1 whitespace-break-spaces ease-out duration-200 transition-colors w-full overflow-hidden overflow-ellipsis"
            >
                {site.name}
            </h3>
            <div
                className="flex gap-1"
            >
                {site.languages.map((language, index) => {
                        return (
                            <img
                                key={index}
                                src={"https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/" + language + ".png"}
                                alt={language}
                            />
                        );
                    }
                )}
            </div>
        </a>
    );
}

export default SiteElement;