import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';

const EmptyComponent = ({title, icon, color, iconSize, fontStyle}) => {
  console.log(iconSize, 'iconSizeiconSizeiconSize');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconsFa name={icon} size={iconSize ? iconSize : RFValue(25)} />
      <Text
        style={{
          fontSize: RFValue(18),
          paddingTop: RFValue(10),
        }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default memo(EmptyComponent);
