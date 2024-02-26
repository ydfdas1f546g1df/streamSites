import data from "@/data/data.json"

function getLanguages() {
    const languages: string[] = [];
    data.forEach((item) => {
        item.languages.forEach((language) => {
            if (!languages.includes(language)) {
                languages.push(language);
            }
        });
    });
    return languages;
}

export default getLanguages;