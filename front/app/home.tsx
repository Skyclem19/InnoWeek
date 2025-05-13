import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Header from "../components/Header";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bienvenue sur la page Home !</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
});
