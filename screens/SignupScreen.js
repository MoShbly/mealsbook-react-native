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

export default function SignupScreen({ navigation }) {
  const ctx = useContext(MealsbookContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isFirstnameError, setIsFirstnameError] = useState(false);
  const [isLastnameError, setIsLastnameError] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  async function handleSignup() {
    setErrorMessage(null);
    let error = false;
    if(!firstname.trim()) {setIsFirstnameError(true); error = true;}
    if(!lastname.trim()) {setIsLastnameError(true); error = true;}
    if(!email.trim()) {setIsEmailError(true); error = true;}
    if(!username.trim()) {setIsUsernameError(true); error = true;}
    if(!password.trim()) {setIsPasswordError(true); error = true;}

    if (error) return;

    setIsFirstnameError(false);
    setIsLastnameError(false);
    setIsEmailError(false);
    setIsUsernameError(false);
    setIsPasswordError(false);

    setIsSigningUp(true);
    const response = await ctx.signup(firstname, lastname, email, username, password);
    if (response.error) {
      setErrorMessage(response.message);
      setIsSigningUp(false);
      return;
    }

    navigation.popToTop();
    navigation.replace('ConfirmEmailScreen')
    setIsSigningUp(false);
  }

  return (
    <ScreenLayout style={styles.container}>
      <Logo />
      <Title title='Sign up' />
      <Message message={errorMessage} error/>
      <View style={styles.form}>
        <View style={styles.nameContainer}>
          <View style={styles.nameInputContainer}>
            <Input
              title='First Name'
              value={firstname}
              onChangeText={setFirstname}
              error={isFirstnameError}
            />
          </View>

          <View style={styles.nameInputContainer}>
            <Input
              title='Last Name'
              value={lastname}
              onChangeText={setLastname}
              error={isLastnameError}
            />
          </View>
        </View>

        <Input
          title='Email'
          value={email}
          onChangeText={setEmail}
          error={isEmailError}
        />

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
        <Button title={isSigningUp ? 'Signing up ...': 'Sign up'} onPress={isSigningUp ? null : handleSignup}/>
        <TextLink title='login' onPress={() => navigation.navigate('LoginScreen')}/>
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
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  nameInputContainer: {
    flex: 1,
  }
});
