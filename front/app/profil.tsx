import { View, Text, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";

export default function Profil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Profil</Text>
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
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});
