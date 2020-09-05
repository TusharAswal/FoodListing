const {defaults} = require('jest-config');
import {NativeModules} from 'react-native';

module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['tsx', ...defaults.moduleFileExtensions],
};

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
