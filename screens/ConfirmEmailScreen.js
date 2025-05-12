import { StyleSheet, View, Text } from 'react-native';
import Title from '../components/Title';
import Button from '../components/Button';
import Logo from '../components/Logo';
import ScreenLayout from '../components/ScreenLayout';
import colors from '../constants/colors';

export default function ConfirmEmailScreen({ navigation }) {
  return (
    <ScreenLayout style={styles.container}>
      <Logo />
      <Title title='Account Created, Welcome!' />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Please confirm your email address.</Text>
        <Text style={styles.text}>We have sent a confirmation link to your email!</Text>
      </View>
      <Button title='Log in' onPress={() => navigation.replace('LoginScreen')} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  textContainer: {
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
    color: colors.purple1,
    fontFamily: 'itim',
  }
});
