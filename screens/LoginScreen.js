import { StyleSheet, View } from 'react-native';
import Input from '../components/Input';
import Title from '../components/Title';
import Button from '../components/Button';
import Message from '../components/Message';
import { useState, useContext } from 'react';
import Logo from '../components/Logo';
import { MealsbookContext } from '../store/MealsbookContext';
import TextLink from '../components/TextLink';
import ScreenLayout from '../components/ScreenLayout';

export default function LoginScreen({ navigation }) {
  const ctx = useContext(MealsbookContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLogingIn, setIsLoginIn] = useState(false);

  async function handleLogin() {
    setErrorMessage(null);
    let error = false;
    if(!username.trim()) {setIsUsernameError(true); error = true;}
    if(!password.trim()) {setIsPasswordError(true); error = true;}
    if (error) return;
    setIsUsernameError(false);
    setIsPasswordError(false);
    setIsLoginIn(true);
    const response = await ctx.login(username, password);
    if (response.error) {
      setErrorMessage(response.message);
    }
    setIsLoginIn(false);
  }

  return (
    <ScreenLayout style={styles.container}>
      <Logo />
      <Title title='Log in' />
      <Message message={errorMessage} error/>
      <View style={styles.form}>
        <Input
          title='Username'
          value={username}
          onChangeText={setUsername}
          error={isUsernameError}
        />

        <Input
          title='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={isPasswordError}
        />
        <Button title={isLogingIn ? 'Logging in ...': 'Log in'} onPress={isLogingIn ? null : handleLogin}/>
        <TextLink title='Signup' onPress={() => navigation.navigate('SignupScreen')}/>
        <TextLink title='Forget Password?' onPress={() => navigation.navigate('ForgetPasswordScreen')}/>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 10,
  },
  form: {
    gap: 20,
    width: '100%',
  }
});
