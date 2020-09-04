// @ts-nocheck
// import socket from 'helpers/sockets';
import Colors from 'constants/color';
import React, {createRef, PureComponent, Suspense} from 'react';
import {ActivityIndicator, SafeAreaView, View, AppState} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
export const ThemeContext = React.createContext('light');

const withRedux = (store) => (WrappedComponent) => () => {
  class ReduxWrapper extends PureComponent {
    constructor(props) {
      super(props);
      this.componentRef = createRef();
      this.state = {
        flag: false,
        appState: true,
      };

      this._initialApicalls();
    }

    _initialApicalls = () => {};

    componentDidMount() {
      SplashScreen.hide();
    }

    render() {
      return (
        <Provider store={store}>
          <ThemeContext.Provider value="dark">
            <Suspense
              fallback={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator />
                </View>
              }>
              <SafeAreaView
                style={{backgroundColor: Colors.Primary}}></SafeAreaView>
              <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
              <SafeAreaView></SafeAreaView>
            </Suspense>
          </ThemeContext.Provider>
        </Provider>
      );
    }
  }
  return React.forwardRef((props, ref) => {
    return <ReduxWrapper {...props} forwardedRef={ref} />;
  });
};

export default withRedux;
