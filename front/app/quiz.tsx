import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

// Structure des questions du quiz
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // Questions du quiz journalier
  const quizQuestions: QuizQuestion[] = [
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

  // Réinitialiser le quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setEarnedPoints(0);
    setQuizCompleted(false);
    setCorrectAnswers(0);
    setUserAnswers([]);
    setQuizStarted(false);
  };

  // Démarrer le quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Calculer les résultats du quiz
  const calculateResults = () => {
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);

    // Calcul des points gagnés (1 point par bonne réponse + 1 point bonus si tout est correct)
    const pointsEarned =
      correctCount + (correctCount === quizQuestions.length ? 1 : 0);
    setEarnedPoints(pointsEarned);
  };

  // Gérer la sélection d'une réponse
  const handleAnswerSelection = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);

    // Mettre à jour la liste des réponses de l'utilisateur
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);

    // Passer à la question suivante après un court délai
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz terminé
        setQuizCompleted(true);
        calculateResults();
      }
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {!quizStarted ? (
          // Écran d'accueil du quiz
          <View style={styles.welcomeContainer}>
            <FontAwesome name="gamepad" size={60} color="#0A3160" />
            <Text style={styles.welcomeTitle}>Quiz Journalier</Text>
            <Text style={styles.welcomeText}>
              Testez vos connaissances sur nos produits et notre programme de
              fidélité. Gagnez jusqu'à {quizQuestions.length + 1} points de
              fidélité !
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
              <Text style={styles.startButtonText}>COMMENCER LE QUIZ</Text>
            </TouchableOpacity>
          </View>
        ) : !quizCompleted ? (
          // Affichage des questions
          <View style={styles.quizContainer}>
            <View style={styles.quizHeader}>
              <Text style={styles.quizTitle}>Quiz journalier</Text>
              <Text style={styles.quizProgress}>
                Question {currentQuestionIndex + 1}/{quizQuestions.length}
              </Text>
            </View>

            <View style={styles.questionCard}>
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
                      <Text
                        style={[
                          styles.answerText,
                          selectedAnswer !== null &&
                          (index ===
                            quizQuestions[currentQuestionIndex].correctAnswer ||
                            (selectedAnswer === index &&
                              index !==
                                quizQuestions[currentQuestionIndex]
                                  .correctAnswer))
                            ? styles.answerTextSelected
                            : {},
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          </View>
        ) : (
          // Affichage des résultats
          <View style={styles.resultsContainer}>
            <MaterialIcons name="emoji-events" size={80} color="#FFD700" />
            <Text style={styles.congratsText}>Félicitations !</Text>

            <View style={styles.resultsCard}>
              <Text style={styles.resultsSummary}>
                Vous avez répondu correctement à{" "}
                <Text style={styles.highlightText}>{correctAnswers}</Text>{" "}
                questions sur{" "}
                <Text style={styles.highlightText}>{quizQuestions.length}</Text>
              </Text>

              <View style={styles.pointsBox}>
                <Text style={styles.pointsBoxTitle}>POINTS GAGNÉS</Text>
                <Text style={styles.pointsEarned}>{earnedPoints}</Text>
              </View>

              <Text style={styles.resultsExplanation}>
                {correctAnswers === quizQuestions.length
                  ? "Parfait ! Vous avez obtenu un bonus de 1 point pour avoir tout réussi."
                  : "Vous gagnez 1 point par bonne réponse."}
              </Text>

              <Text style={styles.comeTomorrowText}>
                Revenez demain pour un nouveau quiz !
              </Text>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
              <Text style={styles.resetButtonText}>RETOUR À L'ACCUEIL</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    minHeight: "100%",
  },
  // Styles pour l'écran d'accueil
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0A3160",
    marginTop: 20,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 10,
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Styles pour le quiz
  quizContainer: {
    flex: 1,
  },
  quizHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A3160",
    marginBottom: 8,
  },
  quizProgress: {
    fontSize: 16,
    color: "#666",
  },
  questionCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 26,
  },
  answersContainer: {
    marginVertical: 10,
  },
  answerButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  answerText: {
    fontSize: 16,
    color: "#444",
  },
  answerTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
  correctAnswer: {
    backgroundColor: "#4CAF50",
    borderColor: "#2E7D32",
  },
  incorrectAnswer: {
    backgroundColor: "#FF5252",
    borderColor: "#D32F2F",
  },
  // Styles pour les résultats
  resultsContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  resultsCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  congratsText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A3160",
    marginTop: 15,
  },
  resultsSummary: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 26,
  },
  highlightText: {
    fontWeight: "bold",
    color: "#0A3160",
  },
  pointsBox: {
    backgroundColor: "#f0f8ff",
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#0A3160",
  },
  pointsBoxTitle: {
    fontSize: 14,
    color: "#0A3160",
    fontWeight: "bold",
    marginBottom: 8,
  },
  pointsEarned: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  resultsExplanation: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  comeTomorrowText: {
    fontSize: 16,
    color: "#0A3160",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: "#0A3160",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 20,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
