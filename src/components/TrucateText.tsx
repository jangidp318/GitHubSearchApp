import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  children: ReactNode;
}

const TruncateText = ({children}: Props) => {
  const text = String(children);

  if (text.length > 30) {
    const truncatedText = text.slice(0, 30) + '...';
    return <Text style={styles.bioText}>{truncatedText}</Text>;
  } else {
    return <Text style={styles.bioText}>{text}</Text>;
  }
};

export default TruncateText;

const styles = StyleSheet.create({
  bioText: {
    fontWeight: '400',
    fontFamily: 'inter',
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
  },
});
