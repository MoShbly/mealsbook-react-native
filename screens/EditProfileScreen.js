import { StyleSheet, View, Text, Image } from 'react-native';
import ChangeProfileInfo from '../components/ChangeProfileInfo';
import DeleteUserCard from '../components/DeleteUserCard';
import ScreenLayout from '../components/ScreenLayout';
import colors from '../constants/colors';
import { useContext, useState } from 'react';
import { MealsbookContext } from '../store/MealsbookContext';
import defaultProfileImage from '../assets/images/profileImage.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker'; 

export default function EditProfileScreen() {
  const ctx = useContext(MealsbookContext);
  const [image, setImage] = useState(ctx.user.image)
  const [isChangingImage, setIsChangingImage] = useState(false)

  async function handleImageChange() {
    setIsChangingImage(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
      aspect: [1,1],
    });

    if (!result.canceled) {
      const base64Url = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
      const response = await ctx.changeImage(base64Url);
      if (!response.error) {
        ctx.authenticate({...response.user, token: ctx.user.token, image: base64Url});
        setImage(base64Url);
      }
    }
    setIsChangingImage(false);
  }

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={ctx.user.image ? {uri: ctx.user.image}: defaultProfileImage} style={styles.image}/>
        <View style={styles.editIconContainer}>
          <MaterialIcons
            name={isChangingImage ? 'file-upload' : 'edit'}
            size={24}
            color="white"
            onPress={isChangingImage ? null : () => handleImageChange()}
          />
        </View>
      </View>
      <Text style={styles.username}>{`@${ctx.user.username}`}</Text>
      <ChangeProfileInfo item='name' />
      <ChangeProfileInfo item='email' />
      <ChangeProfileInfo item='password' />
      <DeleteUserCard />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    gap: 20,
  },
  imageContainer: {
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    color: colors.purple1,
    fontFamily: 'itim',
    fontSize: 24,
  }
});
