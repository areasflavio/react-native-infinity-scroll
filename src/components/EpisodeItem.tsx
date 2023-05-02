import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Episode } from '../models/interfaces';
import { colors } from '../theme/colors';

export function EpisodeItem({ name, episode, air_date }: Episode) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.title}>{episode}</Text>
        </View>
        <Text style={styles.status}>{air_date}</Text>
      </View>
    </View>
  );
}

// NOTE: resource to create card shadow: https://ethercreative.github.io/react-native-shadow-generator/
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 4,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  content: {
    flex: 1,
    gap: 8,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
    maxWidth: '80%',
  },
  status: {
    fontSize: 16,
    color: colors.secondary,
  },
});
