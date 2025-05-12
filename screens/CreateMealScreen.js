import { StyleSheet, View, Image } from 'react-native';
import Input from '../components/Input';
import MultiInput from '../components/MultiInput';
import Title from '../components/Title';
import Button from '../components/Button';
import Message from '../components/Message';
import { useState, useContext } from 'react';
import { MealsbookContext } from '../store/MealsbookContext';
import ScreenLayout from '../components/ScreenLayout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker'; 
import defaultProfileImage from '../assets/images/profileImage.png';

export default function CreateMealScreen() {
  const ctx = useContext(MealsbookContext);

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{key: 'key', value: ''}]);
  const [steps, setSteps] = useState([{key: 'key', value: ''}]);

  const [isImageError, setIsImageError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [isIngredientsError, setIsIngredientsError] = useState(false);
  const [isStepsError, setIsStepsError] = useState(false);

  const [isCreatingMeal, setIsCreatingMeal] = useState(false);
  const [message, setMessage] = useState({message: '', error: false});

  async function handleCreateMeal() {
    setIsNameError(false);
    setIsDescriptionError(false);
    setIsImageError(false);
    setIsIngredientsError(false);
    setIsStepsError(false);
    
    setMessage({message: null, error: false});

    let error = false;
    if(!name.trim()) {setIsNameError(true); error = true;}
    if(!description.trim()) {setIsDescriptionError(true); error = true;}
    if(ingredients.length <= 0) {setIsIngredientsError(true); error = true;}
    if(steps.length <= 0) {setIsStepsError(true); error = true;}

    ingredients.forEach(item => {
      if (!item.value.trim()) {
        error = true;
        setIsIngredientsError(true);
        setIngredients(values => values.map(value => {
          if (value.key !== item.key) return {key: value.key, value: value.value, error: value.error};
          else return {key: value.key, value: value.value, error: true};
        }))
      } else {
        setIngredients(values => values.map(value => {
          if (value.key !== item.key) return {key: value.key, value: value.value, error: value.error};
          else return {key: value.key, value: value.value, error: false};
        }))
      }
    });

    steps.forEach(item => {
      if (!item.value.trim()) {
        error = true;
        setIsStepsError(true);
        setSteps(values => values.map(value => {
          if (value.key !== item.key) return {key: value.key, value: value.value, error: false};
          else return {key: value.key, value: value.value, error: true};
        }))
      } else {
        setSteps(values => values.map(value => {
          if (value.key !== item.key) return {key: value.key, value: value.value, error: value.error};
          else return {key: value.key, value: value.value, error: false};
        }))
      }
    });

    if (error) return;

    setIsNameError(false);
    setIsDescriptionError(false);
    setIsImageError(false);
    setIsIngredientsError(false);
    setIsStepsError(false);

    setIsCreatingMeal(true);

    const ingredientsValues = ingredients.map(item => item.value.trim());
    const stepsValues = steps.map(item => item.value.trim());
    const response = await ctx.createMeal(image, name.trim(), description.trim(), JSON.stringify(ingredientsValues), JSON.stringify(stepsValues));
    if (response.error) {
      setMessage({message: response.message, error: true});
    } else {
      setMessage({message: 'your meal has been created!', error: false});
      setImage('');
      setName('');
      setDescription('');
      setIngredients([{key: 'key', value: ''}]);
      setSteps([{key: 'key', value: ''}]);
    }
    setIsCreatingMeal(false);
  }

  async function handleImageChange() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
      aspect: [6, 5],
    });

    if (!result.canceled) {
      const base64Url = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
      setImage(base64Url);
    }
  }

  return (
    <ScreenLayout style={styles.container}>
      <Title title='create a new meal' />
      
      <View style={styles.imageContainer}>
        <Image source={image ? {uri: image}: defaultProfileImage} style={styles.image}/>
        <View style={styles.editIconContainer}>
          <MaterialIcons
            name={'edit'}
            size={24}
            color="white"
            onPress={() => handleImageChange()}
          />
        </View>
      </View>

      <Message message={message.message} error={message.error}/>
      <View style={styles.form}>
        <Input
          title='meal name'
          value={name}
          onChangeText={setName}
          placeholder='ex: summer fruit salad '
          error={isNameError}
        />

        <Input
          title='meal description'
          value={description}
          onChangeText={setDescription}
          error={isDescriptionError}
          placeholder='ex: an easy meal everyone can make at home!'
          multiline
        />

        <MultiInput
          title='meal ingredients'
          value={ingredients}
          setValue={setIngredients}
          placeholder='ex: 1 tablespone of salt, 3 tomatos, etc.'
          error={isIngredientsError}
        />

        <MultiInput
          title='meal steps'
          value={steps}
          setValue={setSteps}
          placeholder='first do this, do that, etc.'
          multiline
          error={isStepsError}
        />

        <Button title={isCreatingMeal ? 'creating meal ...': 'create meal'} onPress={isCreatingMeal ? null : handleCreateMeal}/>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 10,
  },
  form: {
    gap: 20,
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  nameInputContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'red',
  },
  image: {
    width: '100%',
    height: 250,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: colors.purple1,
    width: 35,
    height: 35,
    borderRadius: 12,
    padding: 5,
  },
});
