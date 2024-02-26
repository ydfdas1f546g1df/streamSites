interface FilterMenuElementInterface {
    searchQueryHandler: (searchQuery: string) => void
    selectedLanguagesHandler: (selectedLanguages: string[]) => void
    selectedCategoriesHandler: (selectedCategories: string[]) => void
    selectedLanguages: string[]
    selectedCategories: string[]
}

export default FilterMenuElementInterface;