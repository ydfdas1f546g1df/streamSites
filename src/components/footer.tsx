const Footer = () => {
    return (
        <footer
            className="border-t-darkgray-700 text-darkgray-100 p-4 border-t-[1px]"
        >
            <p
                className=""
            >
                A list of free&nbsp;
                <a
                    href={"/"}
                    className={"text-darkgray-50 hover:text-darkgray-0 ease-in-out duration-200 transition-colors"}
                >
                    streamSites
                </a> The source code is available on&nbsp;
                <a
                    href={"https://github.com/ydfdas1f546g1df/streamSites"}
                    className={"text-darkgray-50 hover:text-darkgray-0 ease-in-out duration-200 transition-colors"}
                    target={"_blank"}
                >
                    GitHub
                </a>
                .
            </p>
        </footer>
    );
}

export default Footer;