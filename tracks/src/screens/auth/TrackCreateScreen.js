// import "../../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { withNavigationFocus } from "react-navigation";
import Map from "../../components/Map";
import { Context as LocationContext } from "../../context/LocationContext";
import useLocation from "../../hooks/useLocation";
import TrackForm from "../../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  // console.log("OUTSIDE=>", state.recording);
  const callback = useCallback(
    (location) => {
      // console.log("INSIDE=>", state.recording);
      addLocation(location, recording);
    },
    [recording]
  );

  const [error] = useLocation(isFocused || recording, callback);
  // console.log(isFocused);

  return (
    <SafeAreaView>
      <Text h3>Create a track</Text>
      <Map />
      {/* <NavigationEvents onWillBlur={() => console.log("Leaving")} /> */}
      {error ? (
        <Text>
          Heilà genio ! Se non ci dai accesso alla posizione come potrà mai
          funzionare un'app che si chiama TRACKING ? Perchè non disinstalli
          l'app ?
        </Text>
      ) : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
