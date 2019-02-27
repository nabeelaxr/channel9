import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import OneSignal from 'react-native-onesignal';

class MyWeb extends Component {

  constructor(properties) {
    super(properties);
    OneSignal.init("7ab1644a-f50e-4844-87f2-abf69651cddc");
    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <WebView
        style={{ marginTop: 0 }}
        originWhitelist={['*']}
        source={{uri: 'http://www.channel9mobiles.com/estore'}}
      />
    );
  }
}

export default MyWeb;
