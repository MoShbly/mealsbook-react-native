import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import colors from '../constants/colors';
import ScreenLayout from '../components/ScreenLayout';
import Button from '../components/Button';
import Title from '../components/Title';
import ProfileCard from '../components/ProfileCard';
import { useContext, useEffect, useState } from 'react';
import { MealsbookContext } from '../store/MealsbookContext';
import { useIsFocused } from '@react-navigation/native';
import MealCard from '../components/MealCard';

export default function UserProfileScreen({ navigation, route }) {
  const ctx = useContext(MealsbookContext);
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = route.params.username;
  const authenticatedUser = ctx.user.username === username;

  useEffect(() => {
    async function getUserProfile() {
      setIsLoading(true);
      const response = await ctx.getUserProfile(username);
      setUser(response.user);
      setMeals(response.meals);
      console.log(response.meals);
      
      setIsLoading(false);
    }

    if (isFocused) getUserProfile();
  }, [isFocused]);
  
  return (
    <ScreenLayout style={styles.container}>
      {
        isLoading
        ? <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.purple3} />
          </View>
        : <>
            <ProfileCard user={user} numberOfMeals={meals.length} numberOfFavs={user.favs} />
            <View style={styles.titleContainer}>
              <View style={styles.title}>
                <Title title="meals" />
              </View>
              {
                authenticatedUser && <View style={styles.button}>
                  <Button title="+ create" onPress={() => navigation.navigate('CreateMealScreen')} />
                </View>
              }
            </View>
            <View style={styles.meals}>
              {
                meals.length > 0
                ? meals.map(meal =>
                    <View key={meal.id} style={styles.mealContainer}>
                      <MealCard meal={meal}/>
                    </View>
                  )
                : <View style={styles.noMealsContainer}>
                    <Text style={styles.noMealsMsg}>no meals yet!</Text>
                  </View>
              }
            </View>
          </>
      }
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
  },
  meals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mealContainer: {
    width: '50%',
    padding: 5,
  },
  noMealsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMealsMsg: {
    fontFamily: 'itim',
    fontSize: 20,
    color: colors.purple1,
  },
});
