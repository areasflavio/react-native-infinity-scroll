import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
  const [hasNextPage, setHasNextPage] = useState(true);

  function renderListHeader() {
    return <Text style={styles.title}>Rick and Morty</Text>;
  }
  function renderItem({ item }: ListRenderItemInfo<Episode>) {
    return <EpisodeItem {...item} />;
  }

  function renderListFooter(loading: boolean) {
    if (loading) {
      return <ActivityIndicator size={'large'} color={colors.primary} />;
    }
    return null;
  }

  async function getCharacters() {
    if (!hasNextPage) return;

    const { data } = await axios.get<Info<Episode[]>>(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );

    if (data.results) {
      const current = data.results;
      setList((prev) => [...prev, ...current]);

      if (data.info?.next) {
        setPage((prev) => prev + 1);
      } else {
        setHasNextPage(false);
      }
    }
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
        onEndReached={getCharacters}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => renderListFooter(hasNextPage)}
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
