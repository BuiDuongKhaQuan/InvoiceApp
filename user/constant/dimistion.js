import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const statusBarHeight = Constants.statusBarHeight;
export const botomHeight = Platform.OS === 'ios' ? 80 : 50;
