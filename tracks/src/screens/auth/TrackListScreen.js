import React, { useContext } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";

import { Context as TrackContext } from "../../context/TrackContext";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  // console.log(state);

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />

      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // console.log(item.name);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem
                friction={90} //
                tension={100}
                activeScale={0.95} //
              >
                <ListItem.Content>
                  <ListItem.Title
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color="black" />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

TrackListScreen.navigationOptions = { title: "Tracks" };

const styles = StyleSheet.create({});

export default TrackListScreen;
