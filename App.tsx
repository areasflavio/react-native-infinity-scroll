import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { EpisodeItem } from './src/components/EpisodeItem';
import { FixedHeader } from './src/components/FixedHeader';
import { Episode, Info } from './src/models/interfaces';
import { colors } from './src/theme/colors';

export default function App() {
  const [list, setList] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);

  function renderListHeader() {
    return <Text style={styles.title}>Rick and Morty</Text>;
  }
  function renderItem({ item }: ListRenderItemInfo<Episode>) {
    return <EpisodeItem {...item} />;
  }

  async function getCharacters() {
    // NOTE: Simulating a api call delay here
    setTimeout(async () => {
      const { data } = await axios.get<Info<Episode[]>>(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );

      if (data.results) {
        const current = data.results;
        setList((prev) => [...prev, ...current]);
      }
    }, 2000);
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <FixedHeader />
      <FlatList
        ListHeaderComponent={renderListHeader}
        data={list}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.onBackground,
    marginVertical: 16,
  },
});
