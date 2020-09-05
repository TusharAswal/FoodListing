import React from 'react';
import FoodListing from 'components/foodListing';
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  const tree = renderer.create(<FoodListing />).toJSON();
  expect(tree).toMatchSnapshot();
});
