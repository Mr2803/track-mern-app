import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";
// import * as IntentLauncher from "expo-intent-launcher";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  // const goImpo = () => {
  // IntentLauncher.startActivityAsync(
  //   IntentLauncher.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS
  // );
  // };

  // console.log(locations);
  return (
    <>
      <Input
        value={name}
        onChangeText={changeName}
        placeholder="Inserisci nome percorso"
      />
      <Spacer>
        {recording ? (
          <Button title="STOP" onPress={stopRecording} />
        ) : (
          <Button title="Comincia a registrare" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button title="Salva registrazione" onPress={saveTrack} />
        ) : null}
      </Spacer>
      {/* <Button title="Impostazioni" onPress={goImpo}></Button> */}
    </>
  );
};

export default TrackForm;
