import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCdp-eno6Wma6zhqSS5zRzqrGQrHgiplJU',
    authDomain: 'invoicechat-bee1c.firebaseapp.com',
    databaseURL: 'https://invoicechat-bee1c-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'invoicechat-bee1c',
    storageBucket: 'invoicechat-bee1c.appspot.com',
    messagingSenderId: '511110837256',
    appId: '1:511110837256:web:a85abcb28160df3a5ccdbd',
    measurementId: 'G-0J480RVY3F',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const fireDatabase = getDatabase(app);
export { app, fireDatabase };
