import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary700,
    borderWidth: 0.2,
    marginRight: 3,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
