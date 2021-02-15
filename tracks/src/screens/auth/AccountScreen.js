import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    const retrieveEmail = async () => {
      const email = await AsyncStorage.getItem("email");
      if (email) {
        setUserEmail(email);
      }
    };

    retrieveEmail();
  }, []);
  console.log(userEmail);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48, paddingLeft: 10 }}>Account Screen</Text>
      <Text style={{ fontSize: 20, paddingLeft: 10 }}>
        Utente : {userEmail}
      </Text>
      <Spacer>
        <Button title="Logout" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};

const styles = StyleSheet.create({});

export default AccountScreen;
