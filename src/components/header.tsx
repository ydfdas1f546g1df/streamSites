const Header = () => {
    return (
        <header>
            <div className="flex justify-between items-center border-b-[1px] border-darkgray-700 text-darkgray-0 p-4 fixed top-0 right-0 left-0 backdrop-blur">
                <div className="text-2xl font-bold">StreamSites</div>
                <div className="flex gap-4">
                    <a href="https://github.com/ydfdas1f546g1df/streamSites" target={"_blank"} className="text-darkgray-100 hover:text-darkgray-50 font-semibold">
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    );
}
export default Header;