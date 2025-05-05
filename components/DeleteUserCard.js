import { StyleSheet, View } from "react-native";
import colors from "../constants/colors";
import { useContext, useState } from "react";
import Message from "./Message";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";
import { MealsbookContext } from "../store/MealsbookContext";

export default function DeleteUserCard() {
  const ctx = useContext(MealsbookContext);
  
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  async function handleDelete() {
    setErrorMessage(null);
    let error = false;
    if(!password) {setIsPasswordError(true); error = true;}

    if (error) return;

    setIsPasswordError(false);

    setIsDeleting(true);
    const response = await ctx.deleteAccount(password);
    if (response.error) {
      setErrorMessage(response.message);
    } else {
      ctx.logout();
    }
    setIsDeleting(false);
  }

  return (
    <View style={styles.container}>
      <Title textStyle={styles.title} title='account deletion'/>
      <Input
        title='password'
        value={password}
        placeholder='enter password to delete account'
        onChangeText={setPassword}
        error={isPasswordError}
        secureTextEntry
        danger
      />
      {errorMessage && <Message textStyle={styles.message} message={errorMessage} error/>}
      <Button danger title={isDeleting ? `deleting account ...` : `delete account`} onPress={isDeleting ? null : handleDelete}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10, 
    gap: 10,
  },
  title: {
    color: colors.errorColorPrimary,
    textAlign: 'left',
  },
  message: {
    textAlign: 'left',
    fontSize: 16,
  },
});