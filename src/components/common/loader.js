//Commonly used text input component
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loader = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'small'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
export default Loader;
