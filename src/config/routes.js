// @ts-nocheck
// // @ts-nocheck
import {Navigation} from 'react-native-navigation';
import withRedux from '../hoc/withRedux';
import {lazy} from 'react';
const FoodListing = lazy(() => import('containers/foodListing'));
const Loader = lazy(() => import('components/common/loader'));

export const registerScreens = (store, Provider) => {
  const withReduxStore = withRedux(store);
  Navigation.registerComponentWithRedux('Loader', withReduxStore(Loader));
  Navigation.registerComponentWithRedux(
    'FoodListing',
    withReduxStore(FoodListing),
  );
};
