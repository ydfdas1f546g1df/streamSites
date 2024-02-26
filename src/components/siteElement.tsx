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
            flex-col items-center p-4">
            <img
                className={"w-12 aspect-square mx-auto text-ellipsis"}
                src={site.icon}
                alt={site.name}
            />
            <h3
                className="text-darkgray-50 text-center font-bold text-lg p-2 ease-out duration-200 transition-colors"
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