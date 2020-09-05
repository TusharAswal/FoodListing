import idx from 'idx';

export const titleFilter = (array, searchedText) => {
  return idx(array, (_) =>
    _.categories.filter((value) => {
      let categoryPresent = value.category.categoryName
        .toLowerCase()
        .includes(searchedText.toLowerCase()); //If data is found in categories

      let subCategoryPresent =
        value.category.subcategories.filter((item) => {
          let subCatChildFound = item.subCategoryname
            .toLowerCase()
            .includes(searchedText.toLowerCase());
          let subCategoryItemFound =
            item.items.filter((x) =>
              x.toLowerCase().includes(searchedText.toLowerCase()),
            ).length > 0;
          if (subCatChildFound) {
            return item; //If data is found in sub-categories
          } else {
            if (subCategoryItemFound) {
              return item; //If data is found in sub-categories child
            }
          }
        }).length > 0;
      if (categoryPresent) {
        return value;
      } else if (subCategoryPresent) {
        return value;
      }
    }),
  );
};
