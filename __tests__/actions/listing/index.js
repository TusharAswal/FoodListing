import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
export const mockStore = configureMockStore([thunk]);
import * as Types from 'constants/actionTypes';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {fetchFoodList} from 'actions/listing';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('react-native-simple-toast', () => 'Toast');

const initialState = {
  listingReducer: {fetchingFoods: false, allFoods: null},
};

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Testing fetch food listing', () => {
    const responseData = {
      categories: [
        {
          category: {
            subcategories: [
              {
                items: [
                  'Beef (93/7 ground)',
                  'Bison',
                  'Filet Mignon (trim fat)',
                  'Kangaroo',
                  'Sirloin (ground)',
                  'Sirloin Strip Steak',
                  'Veal (Ground)',
                  'Venison',
                ],
                subCategoryname: 'Beef',
              },
              {
                items: ['Lean Loin Chop', 'Lean Pork Loin'],
                subCategoryname: 'Pork',
              },
              {
                items: [
                  'Chicken',
                  'Cornish Game Hen',
                  'Emu',
                  'Ostrich',
                  'Quail',
                  'Turkey',
                ],
                subCategoryname: 'Poultry',
              },
            ],
            quote: '',
            protip: '',
            imagePath:
              'https://s3-us-west-2.amazonaws.com/viking.approvedfoodlistimages/protein%403x.png',
            localImagePath: 'protein',
            categoryName: 'Lean Protein',
            colorCode: '#F168A4',
            servingSize: '4 Oz Servings',
          },
        },
        {
          category: {
            subcategories: [
              {
                items: [
                  'Alaskan King Crab',
                  'Cod',
                  'Flounder',
                  'Grouper',
                  'Halibut',
                  'Lobster',
                  'Mahi Mahi',
                  'Monkfish',
                  'Orange Roughy',
                  'Perch',
                  'Pike',
                  'Salmon *',
                  'Scallops',
                  'Sea Bass',
                  'Shrimp',
                  'Swordfish',
                  'Tilapia',
                  'Walleye',
                  'White Roughy',
                ],
                subCategoryname: '',
              },
            ],
            quote: '*When eating Salmon, reduce the amount to 3oz',
            protip: 'Lean Lunch Meat (93% lean or more) is appropriate',
            imagePath:
              'https://s3-us-west-2.amazonaws.com/viking.approvedfoodlistimages/sea-food%403x.png',
            localImagePath: 'seaFood',
            categoryName: 'Sea Food',
            colorCode: '#689AF1',
            servingSize: '4 Oz Servings',
          },
        },
        {
          category: {
            subcategories: [
              {
                items: [
                  'Banana Peppers',
                  'Bell Peppers',
                  'Bok Choy',
                  'Cabbage',
                  'Celery',
                  'Chives',
                  'Collard Greens',
                  'Cucumbers',
                  'Daikon Radish',
                  'Garlic',
                  'Iceberg Lettuce',
                  'Jalanpeno Peppers',
                  'Manoah Lettuce',
                  'Mushrooms',
                  'Red Leaf Lettuce',
                  'Red Onions',
                  'Romaine Lettuce',
                  'Sauerkraut',
                  'Spinach',
                  'Swiss Chard',
                  'Tomatilio',
                  'Tomato',
                  'Watercress',
                ],
                subCategoryname: 'Free Vegetables',
              },
              {
                items: [
                  'Acorn Squash',
                  'Amaranth',
                  'Asparagus',
                  'Belgian Endive',
                  'Boston Bib Lettuce',
                  'BroccoFlower',
                  'Broccoli',
                  'Broccolini',
                  'Brussel Sprouts',
                  'Butter Lettuce',
                  'Carrots (3 oz)',
                  'Cauliflower',
                  'Celery Root',
                  'Chayote Squash',
                  'Cherry Tomatoes',
                  'Chinese Eggplant',
                  'Crookneck Squash',
                  'Eggplant',
                  'Fennel',
                  'Fiddlehead Ferns',
                  'Green Beans',
                  'Horseradish Root',
                  'Kale',
                  'Kohlrabi',
                  'Leeks',
                  'Pumpkin',
                  'Purple Asparagus',
                  'Radicchio',
                  'Radish Leaves',
                  'Radishes',
                  'Ramps (wild leeks)',
                  'Rhubard',
                  'Snow Peas',
                  'Spaghetti Squash',
                  'Sugar Snap Peas',
                  'Summer Squash',
                  'Sweet Dumpling Squash',
                  'White Onion',
                  'Zucchini',
                ],
                subCategoryname: 'Non-Free Vegetables',
                servingSize: '4 Oz Servings',
              },
            ],
            quote: 'No Potatoes, Corn and Peas allowed',
            protip: '',
            imagePath:
              'https://s3-us-west-2.amazonaws.com/viking.approvedfoodlistimages/vegetables%403x.png',
            localImagePath: 'vegetable',
            categoryName: 'Vegetables',
            colorCode: '#14A581',
          },
        },
        {
          category: {
            subcategories: [
              {
                items: [
                  'Apple',
                  'Apricot',
                  'Bilberry',
                  'Blackberry',
                  'Blueberry',
                  'Boysenberry',
                  'Cherry',
                  'Cloud Fruit',
                  'Cranberry',
                  'Currant',
                  'Damson',
                  'Dragon Fruit',
                  'Elderberry',
                  'Grapefruit',
                  'Honeyberry',
                  'Huckleberry',
                  'Kiwi',
                  'Kumquat',
                  'Lemon',
                  'Lime',
                  'Loquat',
                  'Melon (all varieties)',
                  'Mulberry',
                  'Orange (all varieties)',
                  'Papaya',
                  'Pineberry',
                  'Plum',
                  'Pluot',
                  'Pomello',
                  'Purple Mangosteen',
                  'Quince',
                  'Raspberry',
                  'Sapodilla',
                  'Star Fruit',
                  'Strawberry',
                  'Tamarillo',
                ],
                subCategoryname: 'Approved Fruit',
              },
            ],
            quote: '',
            protip: 'For maximum results it is optional NOT to have fruits',
            categoryName: 'Fruits',
            imagePath:
              'https://s3-us-west-2.amazonaws.com/viking.approvedfoodlistimages/fruits%403x.png',
            localImagePath: 'fruits',
            colorCode: '#F96565',
            servingSize: '3 Oz Servings',
          },
        },
        {
          category: {
            subcategories: [
              {
                items: [
                  'Any spices without sugar',
                  "Bragg's Amino Acids (alternative to soy sauce)",
                  'Chicken, vegetable, or beef broth (low sodium)',
                  'Leamon & Lime Juice',
                  'Water or balsamic vinegar (flavored) with no oil added',
                  'Worcestershire sauce',
                ],
                subCategoryname: '',
              },
            ],
            quote: '',
            protip: '',
            categoryName: 'Alternate ingredients to fats',
            imagePath:
              'https://s3-us-west-2.amazonaws.com/viking.approvedfoodlistimages/fats%403x.png',
            localImagePath: 'fats',
            colorCode: '#FFCA5E',
          },
        },
        {
          category: {
            subcategories: [
              {
                items: [
                  '0-calorie sauces and dressings [Walden Farms/ Hendricks]',
                  '0-calorie coffee creamer',
                  'Braggs Amino Acids',
                  'Cayenne powder/pepper',
                  'Chinese 5 spice',
                  'Citrus juice (lemon, lime, orange …tsp. not cups)',
                  'Crushed red pepper',
                  'Frank’s Hot Sauce or Buffalo Wing Sauce',
                  'Garlic (fresh or powder)',
                  'Herbs (fresh or dried)',
                  'Lemon pepper',
                  'Montreal seasoning',
                  'Pepper (black, green, white and pink)',
                  "'No sugar added' Pico de Gallo",
                  'Pink Himalayan Salt',
                  'Soy sauce (low sodium)',
                  'Stevia sweetener (any flavor)',
                  'Tabasco',
                  'Vinegar (0-Sugar)',
                ],
                subCategoryname: '',
              },
            ],
            quote: '',
            protip: '',
            categoryName: 'Sauces and Seasonings',
            imagePath:
              'https://s3-us-west-2.amazonaws.com/viking.approvedfoodlistimages/sauces%403x.png',
            localImagePath: 'sauces',
            colorCode: '#E95353',
          },
        },
      ],
    };

    fetchMock.getOnce('https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e', {
      headers: {'content-type': 'application/json'},
      body: {data: responseData},
    });

    const expectedActions = [
      {type: Types.FETCH_FOODS_REQUEST},
      {type: Types.FETCH_FOODS_SUCCESS, payload: responseData},
      {type: Types.FETCH_FOODS_FAIL},
    ];
    const store = mockStore(initialState);

    return store.dispatch(fetchFoodList()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual([
        {type: 'FETCH_FOODS_REQUEST'},
        {
          payload: {data: responseData},
          type: 'FETCH_FOODS_SUCCESS',
        },
      ]);
    });
  });
});
