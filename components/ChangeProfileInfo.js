import { StyleSheet, View } from "react-native";
import colors from "../constants/colors";
import { useContext, useState } from "react";
import Message from "./Message";
import Input from "./Input";
import Button from "./Button";
import { MealsbookContext } from "../store/MealsbookContext";

export default function ChangeProfileInfo({ item }) {
  const ctx = useContext(MealsbookContext);
  const [value, setValue] = useState('');
  const [isValueError, setIsValueError] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [message, setMessage] = useState({message: '', error: false});
  
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  
  async function handleChange() {
    setMessage({message: null, error: false});
    let error = false;
    if (item === 'name') {
      if(!firstname.trim() || !lastname.trim() ) {setIsValueError(true); error = true;}
    } else {
      if(!value.trim()) {setIsValueError(true); error = true;}
    }

    if (error) return;

    setIsValueError(false);

    setIsChanging(true);
    let response;
    if (item === 'name') {
      response = await ctx.change.name(firstname, lastname);
    } else {
      response = await ctx.change[item](value);
    }

    if (response.error) {
      setMessage({message: response.message, error: true});
    } else {
      ctx.authenticate({...response.user, token: ctx.user.token});
      setMessage({message: `the ${item} has been chaged.`, error: false});
      setValue('');
      setFirstname('');
      setLastname('');
    }
    setIsChanging(false);
  }

  return (
    <View style={styles.container}>
      {
        item === 'name'
        ? <View style={styles.nameContainer}>
            <View style={styles.nameInputContainer}>
              <Input
                title='new first name'
                value={firstname}
                onChangeText={setFirstname}
                error={isValueError}
                placeholder={ctx.user.firstname}
              />
            </View>

            <View style={styles.nameInputContainer}>
              <Input
                title='new last name'
                value={lastname}
                onChangeText={setLastname}
                error={isValueError}
                placeholder={ctx.user.lastname}
              />
            </View>
          </View>
        : <Input
            title={`new ${item}`}
            value={value}
            placeholder={ctx.user[item]}
            onChangeText={setValue}
            error={isValueError}
            secureTextEntry={item === 'password'} 
          />
      }
      {message.message && <Message textStyle={styles.message} message={message.message} error={message.error}/>}
      <Button title={isChanging ? `changing ${item} ...` : `change ${item}`} onPress={isChanging ? null : handleChange}/>
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
    fontSize: 24,
    fontFamily: 'itim',
    color: colors.purple1,
  },
  message: {
    textAlign: 'left',
    fontSize: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  nameInputContainer: {
    flex: 1,
  }
});