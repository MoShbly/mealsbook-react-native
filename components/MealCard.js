import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import defaultProfileImage from '../assets/images/profileImage.png';
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function MealCard({ meal }) {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{color: colors.purple5}}
      style={styles.container}
      onPress={() => navigation.navigate('MealScreen', {id: meal.id})}
    >
      <View style={styles.imageContainer}>
        <Image source={meal.image ? {uri: meal.image}: defaultProfileImage} style={styles.image}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{meal.name}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.username}>{`@${meal.username}`}</Text>
          <View style={styles.statsItem}>
            <Text style={styles.statNumber}>{meal.favs}</Text>
            <Text style={styles.statText}>favs</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: colors.purple2,
  },
  image: {
    width: '100%',
    height: 100,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  name: {
    fontFamily: 'itim',
    fontSize: 24,
    color: colors.purple1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontFamily: 'itim',
    color: colors.purple2,
    fontSize: 18,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems:'center',
    gap: 3,
  },
  statNumber: {
    fontFamily: 'itim',
    color: colors.purple1,
    fontSize: 18,
  },
  statText: {
    fontFamily: 'itim',
    color: colors.purple3,
    fontSize: 16,
  },
});