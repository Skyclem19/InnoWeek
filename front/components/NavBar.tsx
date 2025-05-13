import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Produit")}>
        <Text style={styles.link}>Produit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Panier")}>
        <Text style={styles.link}>Panier</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
        <Text style={styles.link}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  link: {
    fontSize: 16,
    color: "#007AFF",
  },
});
