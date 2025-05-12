import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import Title from '../components/Title';
import TextLink from '../components/TextLink';
import PanelButton from '../components/PanelButton';
import Button from '../components/Button';
import PanelList from '../components/PanelList';
import ScreenLayout from '../components/ScreenLayout';
import colors from '../constants/colors';
import { useContext, useState, useEffect } from 'react';
import { MealsbookContext } from '../store/MealsbookContext';
import { useIsFocused } from '@react-navigation/native';
import defaultProfileImage from '../assets/images/profileImage.png';

export default function MealScreen({ navigation, route }) {
  const ctx = useContext(MealsbookContext);
  const isFocused = useIsFocused();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mealId = route.params.id;
  const [panel, setPanel] = useState('ingredients');
  const [isFaving, setIsFaving] = useState(false);

  useEffect(() => {
    async function getMealById() {
      setIsLoading(true);
      const response = await ctx.getMealById(mealId);
      setMeal(response.meal);
      setIsLoading(false);
    }

    if (isFocused) getMealById();
  }, [isFocused]);

  let ingredients, steps, authenticatedUserMeal;
  if (meal) {
    ingredients = JSON.parse(meal.ingredients);
    steps = JSON.parse(meal.steps);
    authenticatedUserMeal = ctx.user.username === meal.username;
  }

  async function handleActionButton() {
    if (authenticatedUserMeal) {
      navigation.navigate('EditMealScreen', {meal: meal});
    } else {
      setIsFaving(true);
      if (meal.isUserFav) {
        const response = await ctx.removeFav(mealId);
        if (!response.error) {
          setMeal(meal => ({...meal, isUserFav: false, favs: meal.favs - 1}))
        }
      } else {        
        const response = await ctx.addFav(mealId);
        if (!response.error) {
          setMeal(meal => ({...meal, isUserFav: true, favs: meal.favs + 1}))
        }
      }
      setIsFaving(false);
    }
  }

  return (
    <ScreenLayout style={styles.container}>
    {
      isLoading
      ? <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.purple3} />
        </View>
      : <>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={meal.image ? {uri: meal.image} : defaultProfileImage} />
          </View>
          <View style={styles.mealInfoContainer}>
            <View style={styles.actionRow}>
              <View style={styles.usernameContainer}>
                <Text style={styles.by}>by</Text>
                <View>
                  <TextLink 
                    textStyle={styles.username}
                    title={`@${meal.username}`}
                    onPress={() => navigation.navigate('UserProfileScreen',{username: meal.username})}
                  />
                </View>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statNumber}>{meal.favs}</Text>
                <Text style={styles.statText}>favs</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button 
                  title={
                    authenticatedUserMeal
                    ? 'edit meal'
                    : meal.isUserFav
                      ? isFaving ? 'removing ...' : 'remove fav!'
                      : isFaving ? 'adding ...' : 'add to fav!'
                  }
                  onPress={handleActionButton}
                />
              </View>
            </View>
            <Title title={meal.name} textStyle={styles.name}/>
            <Text style={styles.description}>{ meal.description }</Text>
          </View>
          <View style={styles.panelContainer}>
            <View style={styles.panelRow}>
              <PanelButton title='ingredients' active={panel === 'ingredients'} onPress={() => {setPanel('ingredients')}} />
              <PanelButton title='steps' active={panel === 'steps'} onPress={() => {setPanel('steps')}} />
            </View>
            {
              panel === 'ingredients'
              ? <PanelList list={ingredients} />
              : <PanelList list={steps} />
            }
          </View>
        </>
    }
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    gap: 20,
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 250,
  },
  mealInfoContainer: {
    paddingHorizontal: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  usernameContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  by: {
    fontFamily: 'itim',
    color: colors.purple1,
  },
  username: {
    textAlign: 'left',
    fontSize: 20,
    color: colors.purple3,
    textDecorationLine: 'underline'
  },
  name: {
    textAlign: 'left',
  },
  description: {
    fontFamily: 'itim',
    fontSize: 18,
    color: colors.purple2,
  },
  panelContainer: {
    paddingHorizontal: 24,
    gap: 10,
  },
  panelRow: {
    flexDirection: 'row',
    borderColor: colors.purple2,
    borderWidth: 1,
  },
  
});
