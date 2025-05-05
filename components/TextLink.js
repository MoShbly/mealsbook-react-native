import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

export default function TextLink({ title, onPress, textStyle }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[styles.title, textStyle]}>{ title }</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontFamily: 'itim',
    color: colors.purple1,
    textAlign: 'center',
  },
});