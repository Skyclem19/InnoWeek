import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function Profil() {
  const [isProfileSectionExpanded, setIsProfileSectionExpanded] =
    useState(true);
  const [isInformationSectionExpanded, setIsInformationSectionExpanded] =
    useState(true);
  const [isCategoriesSectionExpanded, setIsCategoriesSectionExpanded] =
    useState(true);

  const toggleProfileSection = () => {
    setIsProfileSectionExpanded(!isProfileSectionExpanded);
  };

  const toggleInformationSection = () => {
    setIsInformationSectionExpanded(!isInformationSectionExpanded);
  };

  const toggleCategoriesSection = () => {
    setIsCategoriesSectionExpanded(!isCategoriesSectionExpanded);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.sectionTitleContainer}
            onPress={toggleProfileSection}
          >
            <Text style={styles.sectionTitle}>MON COMPTE</Text>
            <Ionicons
              name={isProfileSectionExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#0d4c76"
            />
          </TouchableOpacity>

          {isProfileSectionExpanded && (
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.sectionHeaderContainer}
                onPress={toggleInformationSection}
              >
                <Text style={styles.sectionHeader}>Mes Informations</Text>
                <Ionicons
                  name={
                    isInformationSectionExpanded ? "chevron-up" : "chevron-down"
                  }
                  size={18}
                  color="#0d4c76"
                />
              </TouchableOpacity>

              {isInformationSectionExpanded && (
                <>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Adresse email</Text>
                    <Text style={styles.infoValue}>
                      thomas.duchamp@gmail.com
                    </Text>
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
                </>
              )}
            </View>
          )}

          {isProfileSectionExpanded && (
            <View style={styles.categoriesSection}>
              <TouchableOpacity
                style={styles.sectionHeaderContainer}
                onPress={toggleCategoriesSection}
              >
                <Text style={styles.sectionHeader}>MES INFORMATIONS</Text>
                <Ionicons
                  name={
                    isCategoriesSectionExpanded ? "chevron-up" : "chevron-down"
                  }
                  size={18}
                  color="#0d4c76"
                />
              </TouchableOpacity>

              {isCategoriesSectionExpanded && (
                <>
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
                    <Text style={styles.categoryText}>
                      PROGRAMME DE FIDÉLITÉ
                    </Text>
                  </View>
                </>
              )}
            </View>
          )}
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
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
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
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 16,
    color: "#0d4c76",
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
