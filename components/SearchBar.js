import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";
import Button from "./Button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

export default function SearchBar({ title, value, onChangeText, onSearch}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder='Search meals ...'
          onChangeText={onChangeText}
        />
        <Ionicons
          name={'search'}
          size={20}
          color={colors.purple1}
          style={styles.searchIcon}
          onPress={onSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: 'itim',
    fontSize: 16,
    color: colors.purple2,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.purple2,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontFamily: 'itim',
    color: colors.purple2,
  },
  searchIcon: {
    padding: 6,
  },
});