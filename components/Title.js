import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function Title({ title, textStyle }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, textStyle]}>{ title }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: 'itim',
    fontSize: 32,
    color: colors.purple1,
    textAlign: 'center',
  },
});