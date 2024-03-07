/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, StyleSheet, Image, Platform} from 'react-native';
import React from 'react';

type SearchBarProps = {
  placeholder?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string;
};

const SearchBar = ({placeholder, onChangeText, value}: SearchBarProps) => {
  return (
    <View
      style={{
        ...styles.container,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
      }}>
      <Image
        source={require('../assets/search.png')}
        style={styles.searchImg}
      />
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#7676801F',
    margin: 20,
    fontSize: 16,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
});
