// @ts-nocheck
import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import FoodListingComponent from 'components/foodListing';
import {fetchFoodList} from 'actions/listing';
class FoodListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: null,
    };
  }
  componentWillMount = () => {
    const {fetchFoodList} = this.props;
    fetchFoodList();
  };
  render() {
    const {searchedText} = this.state;
    const {fetchingFoods, allFoods} = this.props;
    return (
      <FoodListingComponent allFoods={allFoods} fetchingFoods={fetchingFoods} />
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchingFoods: state.listingReducer.fetchingFoods,
    allFoods: state.listingReducer.allFoods,
  };
}

export default connect(mapStateToProps, {
  fetchFoodList,
})(FoodListing);
