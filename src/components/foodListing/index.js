// import SpinnerLoader from 'components/common/spinnerLoader';

import EmptyComponent from 'components/common/emptyComponent';
import Loader from 'components/common/loader';
import colors from 'constants/color';
import {titleFilter} from 'helpers/dataFilter';
import idx from 'idx';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';

const foodListing = (props) => {
  const {fetchingFoods, allFoods} = props;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchedText, setSearchedText] = useState(null);
  const [clonedFoods, setClonedFoods] = useState(null);

  useEffect(() => {
    setClonedFoods(allFoods);
  }, [allFoods]);

  const renderSubCategories = (value) => {
    return (
      <Text style={{fontSize: RFValue(15), marginVertical: RFValue(10)}}>
        {value}
      </Text>
    );
  };

  const renderFoodItems = (value, colorCode) => {
    return (
      <View>
        <Text style={{fontSize: RFValue(18), color: colorCode}}>
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

  const displayItems = (value, colorCode) => {
    console.log(
      idx(value, (_) => _.subcategories),
      'TUSHAR2',
    );

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

  const renderItem = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            index == selectedIndex
              ? setSelectedIndex(null)
              : setSelectedIndex(index);
          }}
          style={{
            height: RFValue(70),
            // width: '100%',
            borderRadius: RFValue(5),
            backgroundColor: colors.White,
            marginVertical: RFValue(5),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: RFValue(50),
                width: RFValue(50),
                backgroundColor: idx(item, (_) => _.category.colorCode),
                borderRadius: RFValue(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconsFa
                name={'exclamation-triangle'}
                size={RFValue(25)}
                color={colors.White}
              />
            </View>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: RFValue(14),
                color: idx(item, (_) => _.category.colorCode),
              }}
              numberOfLines={1}>
              {idx(item, (_) => _.category.categoryName)}{' '}
              <Text
                style={{
                  fontSize: RFValue(14),
                  color: colors.Black,
                }}>
                {idx(item, (_) => _.category.servingSize)
                  ? `(${idx(item, (_) => _.category.servingSize)})`
                  : ''}
              </Text>
            </Text>
          </View>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
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

  console.log('POPPPPPPPP', titleFilter(clonedFoods, searchedText));
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: RFValue(20),
        backgroundColor: colors.Background,
      }}>
      <View
        style={{
          height: RFPercentage(8),
          justifyContent: 'center',
        }}>
        <IconsFa name={'times'} size={RFValue(25)} color={colors.Black} />
      </View>
      <View
        style={{
          height: RFPercentage(10),
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: RFValue(24), fontWeight: 'bold'}}>
          Approved Foods List
        </Text>
      </View>
      <View
        style={{
          height: RFPercentage(10),
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: RFValue(40),
            borderRadius: RFValue(5),
            backgroundColor: colors.Lgrey,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconsFa name={'search'} size={RFValue(15)} color={colors.Gray} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput
              placeholder={'Try searching fat, sauces, name...'}
              style={{
                height: '100%',
                width: '100%',
              }}
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
          showsVerticalScrollIndicator={false}
          // data={idx(clonedFoods, (_) => _.categories)}
          data={titleFilter(clonedFoods, searchedText)}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <View
        style={{
          height: RFValue(50),
          width: RFValue(50),
          borderRadius: RFValue(100),
          backgroundColor: colors.Lblue,
          justifyContent: 'center',
          alignItems: 'center',
          top: RFValue(10),
          right: RFValue(10),
          position: 'absolute',
        }}>
        <IconsFa name={'comments'} size={RFValue(20)} color={colors.White} />
      </View>
    </View>
  );
};
export default foodListing;
