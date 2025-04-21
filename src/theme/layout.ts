import { StyleSheet } from "react-native";

export const globalLayoutStyles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8f6f3", 
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  button: {
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: "#a3e4d7", 
    borderColor: "#76d7c4",
  },
  listItem: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#ffffffd9",
  },
});
