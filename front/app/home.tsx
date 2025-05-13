import { View, Text, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
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
