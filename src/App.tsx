/* eslint-disable react-native/no-inline-styles */
// App.js

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Card from './components/Card';
import {UserDetails} from './types';
import SearchBar from './components/SearchBar';

const API_TOKEN = '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';
const App = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [userData, setUserData] = useState<Array<any>>([]);
  const [sortedData, setSortedData] = useState<[] | UserDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${searchText}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        );
        const data = await response.json();
        setUserData(data.items ?? []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (searchText !== '') {
      setLoading(true);
      fetchUserData();
    }
  }, [searchText]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const promises = userData.map(async (item: any) => {
        try {
          const response = await fetch(item.url, {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          });
          const data = await response.json();
          return {...item, ...data};
        } catch (error) {
          console.error('Error fetching followers count:', error);
          return {...item, followersCount: 0};
        }
      });
      Promise.all(promises).then(updatedResults => {
        const sortedResults = updatedResults.sort(
          (a, b) => b.followers - a.followers,
        );
        setSortedData(sortedResults);
        setLoading(false);
      });
    };

    if (userData.length > 0) {
      fetchUserDetails();
    }
  }, [userData]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search users..."
        onChangeText={handleTextChange}
        value={searchText}
      />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#001010" />
        </View>
      ) : (
        <FlatList
          data={sortedData}
          style={{padding: 20}}
          renderItem={({item}) => <Card data={item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
