import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from "./Button";
import * as Crypto from 'expo-crypto';

export default function MultiInput({ title, placeholder, value, setValue, error, multiline}) {

  function addItem() {
    setValue(values => [...values, {key: Crypto.randomUUID(), value: ''}])
  }

  function removeItem(key) {
    setValue(values => values.filter(item => item.key !== key))
  }

  function changeItem(key, value) {
    setValue(values => values.map(item => {
      if (item.key !== key) return item;
      else return {key, value, error: item.error};
    }))
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, error && styles.titleError]}>{ title }</Text>
      {
        value.map(item =>
          <View key={item.key} style={[styles.inputContainer, item.error && styles.inputContainerError]}>
            <TextInput
              style={styles.input}
              value={item.value}
              placeholder={placeholder}
              multiline={multiline}
              onChangeText={(newValue) => changeItem(item.key, newValue)}
            />
            <Ionicons
              name={'trash'}
              size={20}
              color={colors.purple1}
              style={styles.trashIcon}
              onPress={() => removeItem(item.key)}
            />
          </View>
        )
      }
      <View style={styles.addButtonContainer}>
        <Button title='+ add' onPress={() => addItem()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 4,
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
  trashIcon: {
    marginRight: 6,
  },
  addButtonContainer: {
    flexDirection: 'row',
    width: '30%',
  },
  inputContainerError: {
    borderColor: colors.errorColorPrimary,
    backgroundColor: colors.errorColorAccent,
  },
  titleError: {
    color: colors.errorColorPrimary,
  },
  inputError: {
    color: colors.errorColorPrimary,
    borderColor: colors.errorColorPrimary,
  }
});