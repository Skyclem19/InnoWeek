import { View, Text, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur la page Home !</Text>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});
