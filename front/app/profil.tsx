import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Header from "../components/Header";

export default function Profil() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>MON COMPTE</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Mes Informations</Text>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Adresse email</Text>
              <Text style={styles.infoValue}>thomas.duchamp@gmail.com</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Numéro de portable</Text>
              <Text style={styles.infoValue}>Non renseigné</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Civilité</Text>
              <Text style={styles.infoValue}>Monsieur</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Prénom</Text>
              <Text style={styles.infoValue}>Thomas</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nom</Text>
              <Text style={styles.infoValue}>Duchamp</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              <Text style={styles.infoValue}>06 12 34 56 78</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date d'anniversaire</Text>
              <Text style={styles.infoValue}>12 août 1994</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Pseudonyme</Text>
              <Text style={styles.infoValue}>Thomas Duchamp</Text>
            </View>
          </View>

          <View style={styles.categoriesSection}>
            <Text style={styles.sectionHeader}>MES INFORMATIONS</Text>

            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>MES ADRESSES</Text>
            </View>

            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>MES LISTES CADEAUX</Text>
            </View>

            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>MES COMMANDES</Text>
            </View>

            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>MES RÉSERVATIONS</Text>
            </View>

            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>MES RETOURS</Text>
            </View>

            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>MON MAGASIN FAVORI</Text>
            </View>

            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>PROGRAMME DE FIDÉLITÉ</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  profileSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0d4c76",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 16,
    color: "#0d4c76",
    marginBottom: 15,
    fontWeight: "500",
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#0d4c76",
    fontWeight: "500",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#666",
  },
  categoriesSection: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryText: {
    fontSize: 14,
    color: "#0d4c76",
  },
});
