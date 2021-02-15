import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";

import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";
import NavLink from "../../components/NavLink";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Registrazione TrackerApp"
        errorMessage={state.errorMessage}
        submitButtonText="Registrati"
        onSubmit={signup}
      />
      <NavLink text="Hai già un account ? Vai al login" routeName="Signin" />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignupScreen;
