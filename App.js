import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import OneSignal from 'react-native-onesignal';

class MyWeb extends Component {

  constructor(properties) {
    super(properties);
    OneSignal.init("a27c12bb-b8d4-4877-869d-23e212528741");
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
        originWhitelist={['*']}
        source={{uri: 'http://www.channel9mobiles.com/estore'}}
      />
    );
  }
}

export default MyWeb;
