import CategoriesElement from '@/components/categoriesElement';
import Header from "@/components/header.tsx";
import AsideElement from "@/components/asideElement.tsx";
import Footer from "@/components/footer.tsx";

function App() {
    return (
        <div className="bg-darkgray-900 text-darkgray-0 min-h-screen font-inter">
            <Header/>
            <div className="pt-16"></div>
            <div className="flex gap-4 justify-center overflow-hidden">
                <AsideElement/>
                <div className="flex-1 overflow-hidden" style={{maxHeight: "calc(100vh - 20px)", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none"}}>
                    <CategoriesElement/>
                    <div className="pb-20"></div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}

export default App;
