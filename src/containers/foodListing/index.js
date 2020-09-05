// @ts-nocheck
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FoodListingComponent from 'components/foodListing';
import {fetchFoodList} from 'actions/listing';
import {RFValue} from 'react-native-responsive-fontsize';
import color from 'constants/color';
class FoodListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
    };
  }
  componentWillMount = () => {
    const {fetchFoodList} = this.props;
    fetchFoodList();
  };
  _modalStatus = () => {
    this.setState({modalStatus: true});
  };

  _closeModal = () => {
    this.setState({modalStatus: false});
  };

  render() {
    const {modalStatus} = this.state;
    const {fetchingFoods, allFoods} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this._modalStatus();
          }}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Show Food LIsting</Text>
        </TouchableOpacity>
        <FoodListingComponent
          allFoods={allFoods}
          fetchingFoods={fetchingFoods}
          modalStatus={modalStatus}
          closeModal={this._closeModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  buttonContainer: {
    height: RFValue(50),
    width: RFValue(130),
    borderRadius: RFValue(5),
    backgroundColor: color.Lblue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {fontSize: RFValue(12), color: color.White},
});
function mapStateToProps(state) {
  return {
    fetchingFoods: state.listingReducer.fetchingFoods,
    allFoods: state.listingReducer.allFoods,
  };
}

export default connect(mapStateToProps, {
  fetchFoodList,
})(FoodListing);
