import { Image, StyleSheet, View, Text } from "react-native";
import defaultProfileImage from '../assets/images/profileImage.png';
import colors from "../constants/colors";
import Button from "../components/Button";
import { useContext } from "react";
import { MealsbookContext } from "../store/MealsbookContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileCard({ user, numberOfMeals, numberOfFavs}) {
  const navigation = useNavigation();
  const ctx = useContext(MealsbookContext);
  const authenticatedUser = ctx.user.username === user.username;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.imageContainer}>
          <Image source={ctx.user.image ? {uri: ctx.user.image}: defaultProfileImage} style={styles.image}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{`${user.firstname} ${user.lastname}`}</Text>
          <Text style={styles.username}>{`@${user.username}`}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
              <Text style={styles.statNumber}>{numberOfMeals}</Text>
              <Text style={styles.statText}>meals</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statNumber}>{numberOfFavs}</Text>
              <Text style={styles.statText}>favs</Text>
            </View>
          </View>
        </View>
      </View>
      {
        authenticatedUser &&
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title='edit profile' onPress={() => navigation.navigate('EditProfileScreen')} />
          </View>
          <View style={styles.button}>
            <Button title='logout' onPress={() => ctx.logout()} />
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.purple3,
  },
  profile: {
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  name: {
    fontFamily: 'itim',
    fontSize: 24,
    color: colors.purple1,
  },
  username: {
    fontFamily: 'itim',
    color: colors.purple2,
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 32,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems:'center',
    gap: 3,
  },
  statNumber: {
    fontFamily: 'itim',
    color: colors.purple1,
    fontSize: 20,
  },
  statText: {
    fontFamily: 'itim',
    color: colors.purple3,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
  }
});