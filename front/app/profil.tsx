import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function Profil() {
  const navigation = useNavigation();
  const [isProfileSectionExpanded, setIsProfileSectionExpanded] =
    useState(true);
  const [isInformationSectionExpanded, setIsInformationSectionExpanded] =
    useState(true);
  const [isCategoriesSectionExpanded, setIsCategoriesSectionExpanded] =
    useState(true);

  // Données fictives pour le système de fidélité
  const loyaltyPoints = 70;
  const maxLoyaltyPoints = 200;
  const loyaltyPercentage = (loyaltyPoints / maxLoyaltyPoints) * 100;
  const rewardAmount = "10€";

  const toggleProfileSection = () => {
    setIsProfileSectionExpanded(!isProfileSectionExpanded);
  };

  const toggleInformationSection = () => {
    setIsInformationSectionExpanded(!isInformationSectionExpanded);
  };

  const toggleCategoriesSection = () => {
    setIsCategoriesSectionExpanded(!isCategoriesSectionExpanded);
  };

  // Navigation vers la page Quiz
  const navigateToQuiz = () => {
    navigation.navigate("Quiz");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Système de fidélité */}
        <View style={styles.loyaltyCard}>
          <Text style={styles.loyaltyTitle}>Mes points fidélité</Text>

          <View style={styles.pointsContainer}>
            <Text style={styles.pointsCount}>{loyaltyPoints} points</Text>
            <Text style={styles.maxPoints}>/ {maxLoyaltyPoints} points</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${loyaltyPercentage}%` }]}
            />
          </View>

          <View style={styles.pointsInfoContainer}>
            <Text style={styles.pointsInfo}>1€ dépensé = 1 point gagné</Text>
            <Text style={styles.rewardInfo}>
              200 points = {rewardAmount} de réduction
            </Text>
          </View>

          {/* Quiz journalier - maintenant un bouton de navigation */}
          <TouchableOpacity style={styles.quizButton} onPress={navigateToQuiz}>
            <View style={styles.quizButtonContent}>
              <FontAwesome name="gamepad" size={18} color="white" />
              <Text style={styles.quizButtonText}>QUIZ JOURNALIER</Text>
            </View>
            <View style={styles.quizPointsContainer}>
              <Text style={styles.quizPointsText}>1-6 pts</Text>
            </View>
          </TouchableOpacity>
        </View>

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
  // Styles pour le système de fidélité
  loyaltyCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
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
  loyaltyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A3160",
    marginBottom: 12,
    textAlign: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 10,
  },
  pointsInfoContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  pointsCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A3160",
  },
  maxPoints: {
    fontSize: 14,
    color: "#777",
    marginLeft: 5,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    marginBottom: 15,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  pointsInfo: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  rewardInfo: {
    fontSize: 12,
    color: "#0A3160",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 5,
  },
  // Styles pour le bouton du quiz
  quizButton: {
    backgroundColor: "#0A3160",
    borderRadius: 4,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  quizButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  quizButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  quizPointsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  quizPointsText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  // Styles existants
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
