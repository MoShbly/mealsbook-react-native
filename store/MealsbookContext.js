import { createContext, useState } from "react";
import * as api from "../util/http";
export const MealsbookContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MealsbookContextProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    const response = await api.login(username, password);
    if (!response.error) {
      await authenticate(response.user);
    } else {
      await logout();
    }
    return response;
  }

  async function signup(firstname, lastname, email, username, password) {
    const response = await api.signup(firstname, lastname, email, username, password);
    return response;
  }

  async function resetPassword(username) {
    const response = await api.resetPassword(username);
    return response;
  }
  
  async function authenticate(user) {
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem('user');
  }

  async function changeEmail(newEmail) {
    const response = await api.changeEmail(user.token, newEmail);
    return response;
  }

  async function changeImage(newImage) {
    const response = await api.changeImage(user.token, newImage);
    return response;
  }

  async function changePassword(newPassword) {
    const response = await api.changePassword(user.token, newPassword);
    return response;
  }

  async function changeName(newFirstname, newLastname) {
    const response = await api.changeName(user.token, newFirstname, newLastname);
    return response;
  }

  async function deleteAccount(password) {
    const response = await api.deleteAccount(user.token, password);
    return response;
  }

  async function getUserProfile(username) {
    const response = await api.getUserProfile(username);
    return response;
  }

  async function getMealById(id) {
    const response = await api.getMealById(id, user.id);
    return response;
  }

  async function addFav(mealId) {
    const response = await api.addFav(user.token, mealId);
    return response;
  }

  async function removeFav(mealId) {
    const response = await api.removeFav(user.token, mealId);
    return response;
  }
  
  async function getUserFavs() {
    const response = await api.getUserFavs(user.token);
    return response;
  }

  async function createMeal(image, name, description, ingredients, steps) {
    const response = await api.createMeal(user.token, image, name, description, ingredients, steps);
    return response;
  }

  async function editMeal(mealId, image, name, description, ingredients, steps) {
    const response = await api.editMeal(user.token, mealId, image, name, description, ingredients, steps);
    return response;
  }
  
  async function getMealsBySearch(searchText) {
    const response = await api.getMealsBySearch(searchText);
    return response;
  }
  
  async function deleteMeal(mealId) {
    const response = await api.deleteMeal(user.token, mealId);
    return response;
  }

  const value = {
    user,
    isAuthenticated: !!user,
    authenticate,
    login,
    signup,
    logout,
    resetPassword,
    deleteAccount,
    getUserProfile,
    getMealById,
    addFav,
    removeFav,
    getUserFavs,
    createMeal,
    editMeal,
    changeImage,
    deleteMeal,
    getMealsBySearch,
    change: {
      email: changeEmail,
      password: changePassword,
      name: changeName,
    }
  }
  
  return (
    <MealsbookContext.Provider value={value}>
      { children }
    </MealsbookContext.Provider>
  );
}