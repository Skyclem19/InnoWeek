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
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";

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

          <Image
            source={productImages[selectedImageIndex]}
            style={styles.mainImage}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.zoomButton}>
            <Feather name="search" size={14} color="#0A3160" />
            <Text style={styles.zoomText}>Zoom</Text>
          </TouchableOpacity>

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

          <Text style={styles.price}>13,99 €</Text>

          <TouchableOpacity style={styles.deliveryButton}>
            <FontAwesome name="truck" size={18} color="white" />
            <Text style={styles.deliveryButtonText}>EN LIVRAISON</Text>
          </TouchableOpacity>

          <View style={styles.stockSection}>
            <Text style={styles.stockLabel}>STOCK WEB :</Text>
            <Text style={styles.stockStatus}>DISPONIBLE</Text>
          </View>

          <Text style={styles.deliveryInfo}>
            Livraison en 24 à 72h à partir de 45€
          </Text>

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
  mainImage: {
    width: "100%",
    height: 250,
    marginBottom: 10,
  },
  zoomButton: {
    position: "absolute",
    right: 20,
    bottom: 120,
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
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  deliveryButton: {
    backgroundColor: "#0A3160",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 15,
  },
  deliveryButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
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
    marginBottom: 20,
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
