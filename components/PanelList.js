import { StyleSheet, View } from "react-native";
import ListItem from "./ListItem";

export default function PanelList({ list }) {
  return (
    <View style={styles.container}>
      {list.map((item, index) => <ListItem key={index} item={item} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 5,
  },
});