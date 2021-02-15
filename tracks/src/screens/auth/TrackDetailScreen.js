import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, Button } from "react-native";
import { Context as TrackContext } from "../../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import { speedConverter, timeConverter } from "../../helper/genericFunction";
import config from "../../../config";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const [startingAddress, setStartingAddress] = useState();
  const _id = navigation.getParam("_id");

  const track = state.find((t) => t._id === _id);
  // console.log(track.locations.length);
  const initialCoords = track.locations[0].coords;
  // console.log(initialCoords.latitude);
  const initialTime = timeConverter(track.locations[0].timestamp);
  const finalTime = timeConverter(
    track.locations[track.locations.length - 1].timestamp
  );

  const averageSpeed = speedConverter(
    track.locations.reduce((p, { coords: { speed } }) => p + speed, 0) /
      track.locations.length
  );
  useEffect(() => {
    const reverseGeocode = async (latitude, longitude) => {
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${config}&mode=retrieveAddresses&prox=${latitude},${longitude}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        if (data) {
          setStartingAddress(
            data.Response.View[0].Result[0].Location.Address.Label
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    reverseGeocode(initialCoords.latitude, initialCoords.longitude);
  }, []);

  console.log(startingAddress);

  return (
    <>
      <Text style={{ fontSize: 48 }}>{track.name}</Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
        style={styles.map}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
      <Text>Partenza : {initialTime}</Text>
      <Text>Fine : {finalTime}</Text>
      <Text>Velocità media : {averageSpeed} km/h</Text>
      <Text>Indirizzo di partenza : {startingAddress}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;
