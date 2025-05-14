import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Produit() {
  const [favorite, setFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Images du produit
  const productImages = [
    require("../assets/panier1.png"),
    require("../assets/produit2.png"),
    require("../assets/produit3.png"),
    require("../assets/produit4.png"),
  ];

  // Prix et points fidélité
  const productPrice = 13.99;
  const loyaltyPoints =
    productPrice % 1 >= 0.01
      ? Math.ceil(productPrice)
      : Math.floor(productPrice);
  const ecoResponsiblePoints = 3;
  const totalPoints = loyaltyPoints + ecoResponsiblePoints;

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <ScrollView style={styles.content}>
        {/* Section image principale */}
        <View style={styles.imageSection}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-10%</Text>
          </View>

          <View style={styles.brandBadge}>
            <Text style={styles.brandText}>SPEEDWEAR</Text>
          </View>

          {/* Prix mis en évidence */}
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>{productPrice.toFixed(2)} €</Text>
          </View>

          <Image
            source={productImages[selectedImageIndex]}
            style={styles.mainImage}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.zoomButton}>
            <Feather name="search" size={14} color="#0A3160" />
            <Text style={styles.zoomText}>Zoom</Text>
          </TouchableOpacity>

          {/* Section des boutons d'achat */}
          <View style={styles.purchaseButtonsContainer}>
            <TouchableOpacity style={styles.addToCartButton}>
              <FontAwesome name="shopping-cart" size={18} color="white" />
              <Text style={styles.addToCartButtonText}>AJOUTER AU PANIER</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buyNowButton}>
              <FontAwesome name="bolt" size={18} color="white" />
              <Text style={styles.buyNowButtonText}>ACHETER MAINTENANT</Text>
            </TouchableOpacity>
          </View>

          {/* Points fidélité et éco-responsable */}
          <View style={styles.loyaltyPointsContainer}>
            <View style={styles.pointsRow}>
              <FontAwesome name="star" size={16} color="#4CAF50" />
              <Text style={styles.pointsText}>
                <Text style={styles.pointsValue}>{loyaltyPoints} points</Text>{" "}
                fidélité
              </Text>
            </View>
            <View style={styles.pointsRow}>
              <MaterialCommunityIcons name="leaf" size={16} color="#4CAF50" />
              <Text style={styles.pointsText}>
                <Text style={styles.pointsValue}>
                  +{ecoResponsiblePoints} points
                </Text>{" "}
                éco-responsable
              </Text>
            </View>
            <View style={styles.totalPointsRow}>
              <Text style={styles.totalPointsText}>
                Total:{" "}
                <Text style={styles.totalPointsValue}>
                  {totalPoints} points
                </Text>
              </Text>
            </View>
          </View>

          {/* Miniatures d'images */}
          <View style={styles.thumbnailContainer}>
            {productImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.selectedThumbnail,
                ]}
                onPress={() => selectImage(index)}
              >
                <Image
                  source={image}
                  style={styles.thumbnailImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Boutons de partage */}
          <View style={styles.shareSection}>
            <Text style={styles.shareText}>PARTAGER CETTE FICHE PRODUIT</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="twitter" size={16} color="#1DA1F2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={16} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="pinterest" size={16} color="#E60023" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Section information produit */}
        <View style={styles.productInfoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>BEYBLADE X - STARTER PACK</Text>
            <TouchableOpacity
              onPress={toggleFavorite}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={favorite ? "heart" : "heart-outline"}
                size={24}
                color="#0A3160"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.brandName}>HASBRO</Text>

          <View style={styles.reviewSection}>
            <Text style={styles.reviewText}>Aucun avis client</Text>
          </View>

          <Text style={styles.ageRecommendation}>À PARTIR DE 8 ANS</Text>

          <Text style={styles.productDescription}>
            Envie de vivre le grand le frisson de la prochaine génération
            Beyblade ? On lance sur Beyblade X - Starter Pack ! Ce set inclut 1
            toupie et 1 lanceur (arène vendue séparément)
          </Text>

          <TouchableOpacity>
            <Text style={styles.moreDetailsButton}>PLUS DE DÉTAILS</Text>
          </TouchableOpacity>

          <View style={styles.warningSection}>
            <Text style={styles.warningTitle}>Attention :</Text>
            <Text style={styles.warningText}>
              Ce produit fait partie d'un assortiment. Nous ne pouvons vous
              garantir le modèle que vous avez vu.
            </Text>
          </View>

          <View style={styles.deliveryInfoContainer}>
            <View style={styles.stockSection}>
              <Text style={styles.stockLabel}>STOCK WEB :</Text>
              <Text style={styles.stockStatus}>DISPONIBLE</Text>
            </View>

            <Text style={styles.deliveryInfo}>
              Livraison en 24 à 72h à partir de 45€
            </Text>
          </View>

          <View style={styles.storeSection}>
            <Text style={styles.storeTitle}>RÉSERVATION EN MAGASIN</Text>
            <Text style={styles.storeText}>
              Choisissez un magasin pour consulter la disponibilité près de chez
              vous. Retrait gratuit en 2h.
            </Text>

            <TouchableOpacity style={styles.storeButton}>
              <Feather name="map-pin" size={18} color="white" />
              <Text style={styles.storeButtonText}>CHOISIR UN MAGASIN</Text>
            </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  imageSection: {
    backgroundColor: "white",
    padding: 15,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FF5252",
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  discountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  brandBadge: {
    position: "absolute",
    top: 45,
    left: 10,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  brandText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  // Nouveau style pour afficher le prix plus visible
  priceTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#0A3160",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  priceTagText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  mainImage: {
    width: "100%",
    height: 250,
    marginBottom: 10,
  },
  zoomButton: {
    position: "absolute",
    right: 20,
    bottom: 180,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  zoomText: {
    fontSize: 12,
    color: "#0A3160",
    marginLeft: 4,
  },
  // Styles pour les boutons d'achat
  purchaseButtonsContainer: {
    marginVertical: 15,
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  buyNowButton: {
    backgroundColor: "#0A3160",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
  },
  buyNowButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  // Styles pour les points fidélité
  loyaltyPointsContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    padding: 12,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#4CAF50",
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  pointsText: {
    fontSize: 13,
    color: "#555",
    marginLeft: 8,
  },
  pointsValue: {
    fontWeight: "bold",
    color: "#333",
  },
  totalPointsRow: {
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalPointsText: {
    fontSize: 13,
    color: "#555",
    textAlign: "right",
  },
  totalPointsValue: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  thumbnailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 2,
  },
  selectedThumbnail: {
    borderColor: "#0A3160",
    borderWidth: 2,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  shareSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  shareText: {
    fontSize: 12,
    color: "#777",
  },
  socialButtons: {
    flexDirection: "row",
  },
  socialButton: {
    marginLeft: 15,
  },
  productInfoSection: {
    padding: 15,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  brandName: {
    fontSize: 14,
    color: "#0A3160",
    marginTop: 5,
  },
  reviewSection: {
    marginTop: 10,
  },
  reviewText: {
    fontSize: 13,
    color: "#777",
  },
  ageRecommendation: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
  moreDetailsButton: {
    fontSize: 14,
    color: "#0A3160",
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 15,
  },
  warningSection: {
    borderWidth: 1,
    borderColor: "#FF5252",
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF5252",
    marginBottom: 5,
  },
  warningText: {
    fontSize: 13,
    color: "#555",
  },
  deliveryInfoContainer: {
    marginBottom: 20,
  },
  stockSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stockLabel: {
    fontSize: 13,
    color: "#777",
    marginRight: 5,
  },
  stockStatus: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  deliveryInfo: {
    fontSize: 13,
    color: "#555",
  },
  storeSection: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
  storeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0A3160",
    marginBottom: 10,
  },
  storeText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 15,
  },
  storeButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
  },
  storeButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
