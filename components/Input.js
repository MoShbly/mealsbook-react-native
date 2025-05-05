import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Input({ title, placeholder, value, onChangeText, secureTextEntry, error, danger, multiline}) {
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);

  function toggleSecureText() {
    setIsSecureTextVisible(!isSecureTextVisible);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, danger && {color: colors.errorColorPrimary}, error && styles.titleError]}>{ title }</Text>
      <View style={[styles.inputContainer, danger && {borderColor: colors.errorColorPrimary}, error && styles.inputContainerError]}>
        <TextInput
          style={[styles.input, danger && {color: colors.errorColorPrimary}]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          secureTextEntry={!isSecureTextVisible && secureTextEntry}
        />
        {
          secureTextEntry &&
          <Ionicons
            name={isSecureTextVisible ? 'eye' : 'eye-off'}
            size={20}
            color={error ? colors.errorColorPrimary : danger ? colors.errorColorPrimary : colors.purple2}
            onPress={toggleSecureText}
            style={styles.eyeIcon}
          />
        }
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
  eyeIcon: {
    marginRight: 6,
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