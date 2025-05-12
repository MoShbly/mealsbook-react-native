import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import colors from '../constants/colors';
import ScreenLayout from '../components/ScreenLayout';
import Title from '../components/Title';
import { useContext, useEffect, useState } from 'react';
import { MealsbookContext } from '../store/MealsbookContext';
import { useIsFocused } from '@react-navigation/native';
import MealCard from '../components/MealCard';

export default function UserFavScreen() {
  const ctx = useContext(MealsbookContext);
  const isFocused = useIsFocused();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserFavs() {
      setIsLoading(true);
      const response = await ctx.getUserFavs();
      setMeals(response.favMeals);
      setIsLoading(false);
    }

    if (isFocused) getUserFavs();
  }, [isFocused]);
  
  return (
    <ScreenLayout style={styles.container}>
      {
        isLoading
        ? <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.purple3} />
          </View>
        : meals.length > 0
          ? <>
              <View style={styles.titleContainer}>
                <View style={styles.title}>
                  <Title title="my favorites" />
                </View>
              </View>
              <View style={styles.meals}>
                {meals.map(meal =>
                  <View key={meal.id} style={styles.mealContainer}>
                    <MealCard meal={meal}/>
                  </View>
                )}
              </View>
            </>
          : <View style={styles.noMealsContainer}>
              <Text style={styles.noMealsMsg}>You have not added any fav meals.</Text>
            </View>
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
  }
});
