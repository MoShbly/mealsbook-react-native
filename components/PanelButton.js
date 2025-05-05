import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

export default function TextLink({ title, onPress, active }) {
  return (
    <Pressable style={[styles.container, active && styles.activeContainer]} onPress={onPress}>
      <Text style={[styles.title, active && styles.activeTitle]}>{ title }</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  activeContainer: {
    backgroundColor: colors.purple2,
    opacity: 1,
  },
  title: {
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'itim',
    textAlign: 'center',
  },
  activeTitle: {
    color: 'white',
    fontSize: 24,
  }
});