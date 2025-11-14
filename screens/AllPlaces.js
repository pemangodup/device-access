import { useEffect, useLayoutEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View } from "react-native";

import Placeslist from "../components/Place/PlacesList";
import { clearDb, fetchPlaces } from "../util/database";
import IconButton from "../components/UI/IconButton";

function AllPlaces({ navigation }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  async function clearHandler() {
    await clearDb();
    setLoadedPlaces([]);
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="trash"
            size={24}
            color={tintColor}
            onPress={clearHandler}
          />
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("AddPlace")}
          />
        </View>
      ),
    });
  });

  return <Placeslist places={loadedPlaces} />;
}

export default AllPlaces;
