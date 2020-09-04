import idx from 'idx';

export const titleFilter = (array, searchedText) => {
  return idx(array, (_) =>
    _.categories.filter((value) => {
      if (
        value.category.categoryName
          .toLowerCase()
          .includes(searchedText.toLowerCase())
      ) {
        return value;
      } else if (
        value.category.subcategories.filter((item) => {
          if (
            item.subCategoryname
              .toLowerCase()
              .includes(searchedText.toLowerCase())
          ) {
            return item;
          } else {
            if (
              item.items.filter((x) =>
                x.toLowerCase().includes(searchedText.toLowerCase()),
              ).length > 0
            ) {
              return item;
            }
          }
        }).length > 0
      ) {
        return value;
      }
    }),
  );
};

// export const titleFilter = (array, searchedText) => {
//   let filteredResult = [];
//   let item = idx(array, (_) =>
//     _.categories.filter((value) => {
//       if (
//         value.category.categoryName
//           .toLowerCase()
//           .includes(searchedText.toLowerCase())
//       ) {
//         console.log(value, 'ONE=======>');
//         return value;
//       } else {
//         if (
//           idx(value, (_) =>
//             _.category.subcategories.filter((item) => {
//               if (
//                 item.subCategoryname
//                   .toLowerCase()
//                   .includes(searchedText.toLowerCase())
//               ) {
//                 console.log(item, 'TWO=======>');
//                 return item;
//               } else {
//                 console.log(item, 'THRE=======>');
//                 return idx(item, (_) =>
//                   _.items.filter(
//                     (x) =>
//                       x.toLowerCase().includes(searchedText.toLowerCase())
//                         .length > 0,
//                   ),
//                 );
//               }
//             }),
//           )
//         ) {
//           return value;
//         }
//       }
//     }),
//   );
//   return item;
// };
