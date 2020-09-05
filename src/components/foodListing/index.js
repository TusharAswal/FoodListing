// import SpinnerLoader from 'components/common/spinnerLoader';

import EmptyComponent from 'components/common/emptyComponent';
import Loader from 'components/common/loader';
import colors from 'constants/color';
import {titleFilter} from 'helpers/dataFilter';
import idx from 'idx';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  StyleSheet,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
const {UIManager} = NativeModules;
const CustomLayoutAnimation = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
};
const foodListing = (props) => {
  const {fetchingFoods, allFoods, modalStatus, closeModal} = props;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchedText, setSearchedText] = useState('');
  const [clonedFoods, setClonedFoods] = useState(null);

  useEffect(() => {
    setClonedFoods(allFoods);
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, [allFoods]);

  const renderSubCategories = (value) => {
    return <Text style={styles.subCategoryValue}>{value}</Text>;
  };

  // All Sub-Categories child items
  const renderFoodItems = (value, colorCode) => {
    return (
      <View>
        <Text style={[styles.subCategoryText, {color: colorCode}]}>
          {value.subCategoryname}
        </Text>
        <FlatList
          ListEmptyComponent={() => (
            <EmptyComponent title={'No data available.'} />
          )}
          showsVerticalScrollIndicator={false}
          data={idx(value, (_) => _.items)}
          renderItem={({item, index}) => {
            return renderSubCategories(item);
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  // All Sub-Categories items

  const displayItems = (value, colorCode) => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    return (
      <FlatList
        ListEmptyComponent={() => (
          <EmptyComponent title={'No data available.'} />
        )}
        showsVerticalScrollIndicator={false}
        data={idx(value, (_) => _.subcategories)}
        renderItem={({item, index}) => {
          return renderFoodItems(item, colorCode);
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // All Categories items
  const renderItem = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            index == selectedIndex
              ? setSelectedIndex(null)
              : setSelectedIndex(index);
          }}
          style={styles.categoryContainer}>
          <View style={styles.categoryIcon}>
            <View
              style={[
                styles.icon,
                {backgroundColor: idx(item, (_) => _.category.colorCode)},
              ]}>
              <IconsFa
                name={'exclamation-triangle'}
                size={RFValue(25)}
                color={colors.White}
              />
            </View>
          </View>
          <View style={styles.categoryTitle}>
            <Text
              style={[
                styles.categoryText,
                {color: idx(item, (_) => _.category.colorCode)},
              ]}
              numberOfLines={1}>
              {idx(item, (_) => _.category.categoryName)}{' '}
              <Text style={styles.categorySubText}>
                {idx(item, (_) => _.category.servingSize)
                  ? `(${idx(item, (_) => _.category.servingSize)})`
                  : ''}
              </Text>
            </Text>
          </View>
          <View style={styles.openHolder}>
            <IconsFa
              name={'chevron-down'}
              size={RFValue(20)}
              color={colors.Lgrey}
            />
          </View>
        </TouchableOpacity>
        {selectedIndex == index
          ? displayItems(
              idx(item, (_) => _.category),
              idx(item, (_) => _.category.colorCode),
            )
          : null}
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalStatus}
      onRequestClose={() => {
        closeModal();
      }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            closeModal();
          }}
          style={styles.backContainer}>
          <IconsFa name={'times'} size={RFValue(25)} color={colors.Black} />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Approved Foods List</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchChild}>
            <View style={styles.searchIcon}>
              <IconsFa name={'search'} size={RFValue(15)} color={colors.Gray} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Try searching fat, sauces, name...'}
                style={styles.inputField}
                onChangeText={(text) => setSearchedText(text)}
                value={searchedText}
              />
            </View>
          </View>
        </View>
        {fetchingFoods ? (
          <Loader />
        ) : (
          <FlatList
            ListEmptyComponent={() => (
              <EmptyComponent title={'No data available.'} />
            )}
            contentContainerStyle={{paddingHorizontal: RFValue(20)}}
            showsVerticalScrollIndicator={false}
            data={titleFilter(clonedFoods, searchedText)}
            renderItem={({item, index}) => {
              return renderItem(item, index);
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <View style={styles.chatContainer}>
          <IconsFa name={'comments'} size={RFValue(20)} color={colors.White} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.Background,
  },
  backContainer: {
    height: RFPercentage(8),
    paddingHorizontal: RFValue(20),
    justifyContent: 'center',
  },
  headerContainer: {
    height: RFPercentage(10),
    justifyContent: 'center',
    paddingHorizontal: RFValue(20),
  },
  headerText: {fontSize: RFValue(24), fontWeight: 'bold'},
  searchContainer: {
    height: RFPercentage(10),
    paddingHorizontal: RFValue(20),
    justifyContent: 'center',
  },
  searchChild: {
    height: RFValue(40),
    borderRadius: RFValue(5),
    backgroundColor: colors.Lgrey,
    flexDirection: 'row',
  },
  searchIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {flex: 0.9},
  inputField: {
    height: '100%',
    width: '100%',
  },
  chatContainer: {
    height: RFValue(50),
    width: RFValue(50),
    borderRadius: RFValue(100),
    backgroundColor: colors.Lblue,
    justifyContent: 'center',
    alignItems: 'center',
    top: RFValue(20),
    right: RFValue(10),
    position: 'absolute',
  },
  categoryContainer: {
    height: RFValue(70),
    borderRadius: RFValue(5),
    backgroundColor: colors.White,
    marginVertical: RFValue(5),
    flexDirection: 'row',
  },
  categoryIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: RFValue(50),
    width: RFValue(50),
    borderRadius: RFValue(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {flex: 0.7, justifyContent: 'center'},
  categoryText: {
    fontSize: RFValue(14),
  },
  categorySubText: {
    fontSize: RFValue(14),
    color: colors.Black,
  },
  openHolder: {flex: 0.1, justifyContent: 'center'},
  subCategoryText: {fontSize: RFValue(18)},
  subCategoryValue: {fontSize: RFValue(15), marginVertical: RFValue(10)},
});
export default foodListing;
