import Playlist from '@/components/Playlist';
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

const playlists = [
  {
    id: 1,
    imageUrl: '',
    title: '내 플레이리스트',
    contents: [],
  },
  {
    id: 2,
    imageUrl: '',
    title: 'K-Pop 플레이리스트',
    contents: [],
  },
  {
    id: 3,
    imageUrl: '',
    title: '발라드',
    contents: [],
  },
  {
    id: 4,
    imageUrl: '',
    title: '발라드',
    contents: [],
  },
  {
    id: 5,
    imageUrl: '',
    title: '발라드발라드발라드발라드발라드발라드발라드',
    contents: [],
  },
  {
    id: 6,
    imageUrl: '',
    title: '발라드',
    contents: [],
  },
];

function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>내 라이브러리</Text>
      <FlatList
        data={playlists}
        renderItem={({ item }) => <Playlist {...item} />}
        numColumns={3}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    flex: 1,
  },
  scrollView: {},
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
});
export default LibraryScreen;
