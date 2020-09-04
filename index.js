/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

// @ts-nocheck
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {registerScreens} from './src/config/routes';
import {store} from './src/store/setup';
import {AppRegistry, Text, TextInput} from 'react-native';
console.disableYellowBox = true;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Navigation.events().registerAppLaunchedListener(() => {
  registerScreens(store, Provider);
});
AppRegistry.registerComponent('MeetUp', () => App);
