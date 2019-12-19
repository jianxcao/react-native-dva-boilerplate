/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { getProvider } from '@/common/js/setting';

import { FormattedMessage } from 'react-intl';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';

let App = () => {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <FormattedMessage id='retry'>
              {val => (
                <Text
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#0f0',
                    textAlign: 'left',
                    paddingLeft: 10,
                  }}
                >
                  {val}
                </Text>
              )}
            </FormattedMessage>
            <Text style={{}}>
              abc<Text>abc</Text>
              <Text>abc</Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
export default getProvider(<App />);
