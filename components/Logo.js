import { Image, StyleSheet, View } from "react-native";
import logoImage from '../assets/images/logo.png';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});