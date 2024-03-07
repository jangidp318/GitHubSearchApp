/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {UserDetails} from '../types';
import TruncateText from './TrucateText';
const Card = ({data}: {data: UserDetails}) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperSubContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: data.avatar_url}} style={styles.avatarImg} />
            <View style={{margin: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.name}>{data.name ?? data.login}</Text>
                {data.location && data.location.length <= 15 && (
                  <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>{data.location}</Text>
                  </View>
                )}
              </View>

              <TruncateText>{data.bio ?? 'No Bio'}</TruncateText>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/repository.png')}
              style={styles.repositoryImg}
            />
            <Text style={styles.repoText}>{data.public_repos ?? 0}</Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.lowerContainer}>
        <Image
          source={require('../assets/followers.png')}
          style={styles.followersImg}
        />
        <Text style={styles.followersText}>{data.followers}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    marginVertical: 10,
  },
  upperSubContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  name: {
    fontWeight: '700',
    fontFamily: 'inter',
    fontSize: 14,
    color: '#000',
  },
  locationContainer: {
    borderColor: '#6D788D',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 7,
    marginHorizontal: 5,
    backgroundColor: '#6D788D30',
  },
  locationText: {
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  lowerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followersText: {
    fontWeight: '600',
    fontFamily: 'inter',
    fontSize: 14,
    color: '#4C4C4C',
    marginHorizontal: 5,
  },
  followersImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  repositoryImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  repoText: {
    fontWeight: '600',
    fontFamily: 'inter',
    fontSize: 16,
    color: '#000',
    marginHorizontal: 5,
  },
});
