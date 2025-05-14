import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import Header from "../components/Header";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function Profil() {
  const [isProfileSectionExpanded, setIsProfileSectionExpanded] =
    useState(true);
  const [isInformationSectionExpanded, setIsInformationSectionExpanded] =
    useState(true);
  const [isCategoriesSectionExpanded, setIsCategoriesSectionExpanded] =
    useState(true);
  const [quizModalVisible, setQuizModalVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Données fictives pour le système de fidélité
  const loyaltyPoints = 70;
  const maxLoyaltyPoints = 200;
  const loyaltyPercentage = (loyaltyPoints / maxLoyaltyPoints) * 100;
  const rewardAmount = "10€";

  // Questions du quiz journalier
  const quizQuestions = [
    {
      question: "Quelle est la marque de la toupie dans notre catalogue ?",
      options: ["Mattel", "Hasbro", "Bandai", "LEGO"],
      correctAnswer: 1,
    },
    {
      question:
        "Combien de points fidélité gagne-t-on pour chaque euro dépensé ?",
      options: ["0.5 point", "1 point", "2 points", "5 points"],
      correctAnswer: 1,
    },
    {
      question: "Quel âge minimum est recommandé pour jouer avec Beyblade X ?",
      options: ["3 ans", "5 ans", "8 ans", "12 ans"],
      correctAnswer: 2,
    },
    {
      question:
        "Quelle couleur est associée à notre programme éco-responsable ?",
      options: ["Bleu", "Rouge", "Jaune", "Vert"],
      correctAnswer: 3,
    },
    {
      question:
        "Combien de points de fidélité faut-il pour obtenir une réduction de 10€ ?",
      options: ["100 points", "150 points", "200 points", "250 points"],
      correctAnswer: 2,
    },
  ];

  const toggleProfileSection = () => {
    setIsProfileSectionExpanded(!isProfileSectionExpanded);
  };

  const toggleInformationSection = () => {
    setIsInformationSectionExpanded(!isInformationSectionExpanded);
  };

  const toggleCategoriesSection = () => {
    setIsCategoriesSectionExpanded(!isCategoriesSectionExpanded);
  };

  const openQuizModal = () => {
    setQuizModalVisible(true);
    setCurrentQuestionIndex(0);
    setEarnedPoints(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const closeQuizModal = () => {
    setQuizModalVisible(false);
  };

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    // Vérifier si la réponse est correcte
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      // Ajouter entre 1 et 5 points aléatoirement
      const pointsToAdd = Math.floor(Math.random() * 5) + 1;
      setEarnedPoints(earnedPoints + pointsToAdd);
    }

    // Passer à la question suivante après un court délai
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz terminé
        setQuizCompleted(true);
      }
    }, 1000);
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
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

          {/* Quiz journalier */}
          <TouchableOpacity style={styles.quizButton} onPress={openQuizModal}>
            <View style={styles.quizButtonContent}>
              <FontAwesome name="gamepad" size={18} color="white" />
              <Text style={styles.quizButtonText}>QUIZ JOURNALIER</Text>
            </View>
            <View style={styles.quizPointsContainer}>
              <Text style={styles.quizPointsText}>1-5 pts</Text>
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

      {/* Modal pour le quiz journalier */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={quizModalVisible}
        onRequestClose={closeQuizModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {!quizCompleted ? (
              /* Affichage des questions */
              <>
                <View style={styles.quizHeader}>
                  <Text style={styles.quizTitle}>Quiz journalier</Text>
                  <Text style={styles.quizProgress}>
                    Question {currentQuestionIndex + 1}/{quizQuestions.length}
                  </Text>
                </View>

                <Text style={styles.questionText}>
                  {quizQuestions[currentQuestionIndex].question}
                </Text>

                <View style={styles.answersContainer}>
                  {quizQuestions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.answerButton,
                          selectedAnswer !== null &&
                            (index ===
                            quizQuestions[currentQuestionIndex].correctAnswer
                              ? styles.correctAnswer
                              : selectedAnswer === index &&
                                index !==
                                  quizQuestions[currentQuestionIndex]
                                    .correctAnswer
                              ? styles.incorrectAnswer
                              : {}),
                        ]}
                        onPress={() => handleAnswerSelection(index)}
                        disabled={selectedAnswer !== null}
                      >
                        <Text style={styles.answerText}>{option}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </>
            ) : (
              /* Affichage des résultats */
              <View style={styles.resultsContainer}>
                <MaterialIcons name="emoji-events" size={60} color="#FFD700" />
                <Text style={styles.congratsText}>Félicitations !</Text>
                <Text style={styles.resultsText}>
                  Vous avez gagné{" "}
                  <Text style={styles.pointsEarned}>{earnedPoints} points</Text>
                </Text>
                <Text style={styles.comeTomorrowText}>
                  Revenez demain pour un nouveau quiz !
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeQuizModal}
                >
                  <Text style={styles.closeButtonText}>FERMER</Text>
                </TouchableOpacity>
              </View>
            )}

            {!quizCompleted && (
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={closeQuizModal}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
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
  // Styles pour le modal du quiz
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    maxHeight: "80%",
  },
  quizHeader: {
    marginBottom: 20,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A3160",
    textAlign: "center",
    marginBottom: 5,
  },
  quizProgress: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  answersContainer: {
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 15,
    marginBottom: 10,
  },
  answerText: {
    fontSize: 14,
    color: "#333",
  },
  correctAnswer: {
    backgroundColor: "#4CAF50",
  },
  incorrectAnswer: {
    backgroundColor: "#FF5252",
  },
  closeModalButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#0A3160",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  // Styles pour les résultats du quiz
  resultsContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0A3160",
    marginTop: 15,
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  pointsEarned: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  comeTomorrowText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#0A3160",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
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
