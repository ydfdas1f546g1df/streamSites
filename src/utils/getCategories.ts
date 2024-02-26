import SiteInterface from "@/interfaces/siteInterface.tsx";
import data from "@/data/data.json";

function getCategories() {
    const categories: { [key: string]: SiteInterface[] } = {};

    data.forEach((site) => {
        if (categories[site.category] === undefined) {
            categories[site.category] = [];
        }
        categories[site.category].push(site);
    });

    // sort the categories
    Object.keys(categories).sort().forEach((key) => {
        const value = categories[key];
        delete categories[key];
        categories[key] = value;
    });

    // sort the sites in each category
    Object.keys(categories).forEach((category) => {
        categories[category].sort((a, b) => a.name.localeCompare(b.name));
    });
    return categories;
}

export default getCategories;
