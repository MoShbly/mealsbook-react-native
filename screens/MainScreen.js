import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Title from '../components/Title';
import Button from '../components/Button';
import Logo from '../components/Logo';
import ScreenLayout from '../components/ScreenLayout';
import colors from '../constants/colors';
import { useContext, useState } from 'react';
import { MealsbookContext } from '../store/MealsbookContext';
import * as ImagePicker from 'expo-image-picker'; 
import SearchBar from '../components/SearchBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MealCard from '../components/MealCard';

export default function MainScreen({ navigation }) {
  const ctx = useContext(MealsbookContext);
  const [searchText, setSearchText] = useState('');
  const [isGettingMeals, setIsGettingMeals] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [meals, setMeals] = useState([]);

  async function handleSearch() {
    setIsSearchError(false);
    if (!searchText || !searchText.trim()) {
      setIsSearchError(true);
      return;
    }

    setIsGettingMeals(true);
      const response = await ctx.getMealsBySearch(searchText)
      if (!response.error) {
        setMeals(response.meals);
      }
    setIsGettingMeals(false);
  }

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Title title={`Hello, @${ctx.user.username}!`} />
        </View>
        <View style={styles.iconsRow}>
          <Ionicons
            name={'person-outline'}
            size={24}
            color={'white'}
            style={styles.icon}
            onPress={() => navigation.navigate('UserProfileScreen', {username: ctx.user.username})}
          />
          <Ionicons
            name={'star-outline'}
            size={24}
            color={'white'}
            style={styles.icon}
            onPress={() => navigation.navigate('UserFavScreen')}
          />
          <AntDesign
            name={'logout'}
            size={24}
            color={'white'}
            style={styles.icon}
            onPress={() => ctx.logout()}
          />
        </View>
      </View>
      <SearchBar title='search' value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />
      {
        isGettingMeals
        ? <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.purple3} />
          </View>
        : <>
            <View style={styles.titleContainer}>
              <View style={styles.title}>
                <Title title="meals" />
              </View>
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
                    <Text style={styles.noMealsMsg}>
                      {
                        (searchText && searchText.trim())
                        ? 'no meal names matching your search term!'
                        : 'use search bar to search for and get meals!'
                      }
                    </Text>
                  </View>
              }
            </View>
          </>
      }
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  icon: {
    borderColor: colors.purple1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
    backgroundColor: colors.purple1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
