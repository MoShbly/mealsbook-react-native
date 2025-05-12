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

export default function ForgetPasswordScreen({ navigation }) {
  const ctx = useContext(MealsbookContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [message, setMessage] = useState({message: '', error: false});
  const [isSending, setIsSending] = useState(false);

  async function handleSendingRequest() {
    setMessage({message: null, error: false});
    let error = false;
    if(!username.trim()) {setIsUsernameError(true); error = true;}

    if (error) return;

    setIsUsernameError(false);

    setIsSending(true);
    const response = await ctx.resetPassword(username, password);
    if (response.error) {
      setMessage({message: response.message, error: true});
    } else {
      setMessage({message: 'A new password has been sent to your email address.', error: false});
    }
    setIsSending(false);

  }

  return (
    <ScreenLayout style={styles.container}>
      <Logo />
      <Title title='Log in' />
      <Message message={message.message} error={message.error}/>
      <View style={styles.form}>
        <Input
          title='Username'
          value={username}
          onChangeText={setUsername}
          error={isUsernameError}
        />

        <Button title={isSending ? 'Sending Request ...': 'Request a new password'} onPress={isSending ? null : handleSendingRequest}/>
        <TextLink title='Login' onPress={() => navigation.navigate('LoginScreen')}/>
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
