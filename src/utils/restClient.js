import NetInfo from '@react-native-community/netinfo';
import {create} from 'apisauce';
import API from 'constants/api';
import {store} from 'store/setup';
import idx from 'idx';
import Toast from 'react-native-simple-toast';

const api = create({
  baseURL: API.SERVER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

class RestClient {
  static isConnected() {
    return new Promise(function (fulfill, reject) {
      NetInfo.fetch().then((isConnected) => {
        if (isConnected && isConnected.isConnected) fulfill(isConnected);
        else {
          reject(`Please check your internet connection and try again`);
        }
      });
    });
  }

  static getCall(url, enableToast) {
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.get(url).then((response) => {
            if (response.status && response.status === 200) {
              fulfill(response.data);
            } else {
              reject('Api Fail');
            }
          });
        })
        .catch((error) => {
          if (enableToast) Toast.show(`${error}`);
          reject(error);
        });
    });
  }
}

export default RestClient;
