import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function Message({ message, error, textStyle}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, textStyle, error && styles.error]}>{ message }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: 'itim',
    fontSize: 18,
    textAlign: 'center',
    color: colors.purple3,
  },
  error: {
    color: colors.errorColorPrimary,
  }
});