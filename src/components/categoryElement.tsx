import SiteElement from '@/components/siteElement.tsx';
import SiteInterface from '@/interfaces/siteInterface.ts';

const CategoryElement = ({ sitesData, categoryName }: { sitesData: SiteInterface[]; categoryName: string; }) => {
    
    return (
        <div
        className="px-4"
        >
            <h2 className="text-darkgray-0 font-bold text-2xl p-2 pt-8 border-b-darkgray-700 mb-4">{categoryName}</h2>
            <div className="flex flex-wrap justify-start gap-4">
                {sitesData.map((site: SiteInterface, index: number) => (
                    <SiteElement
                        key={index}
                        site={site}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryElement;
