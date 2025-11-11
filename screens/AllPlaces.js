import { Text } from "react-native";
import Placeslist from "../components/Place/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <Placeslist places={loadedPlaces} />;
}

export default AllPlaces;
