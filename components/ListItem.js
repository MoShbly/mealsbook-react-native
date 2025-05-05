import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";


export default function ListItem({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ item }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.purple1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5
  },
  text: {
    fontSize: 16,
    fontFamily: 'itim',
    color: colors.purple2
  },
});