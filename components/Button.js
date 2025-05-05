import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

export default function Button({ title, onPress, danger }) {
  return (
    <Pressable android_ripple={{color: colors.purple2}} style={[styles.container, danger && {backgroundColor: colors.errorColorPrimary, borderColor: colors.errorColorPrimary}]} onPress={onPress}>
      <Text style={styles.title}>{ title }</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.purple1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.purple1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'itim',
    color: 'white',
    textAlign: 'center',
  },
});