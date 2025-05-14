import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

// Interface pour les articles du panier
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

export default function Panier() {
  // Données du panier
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "BEYBLADE X - STARTER PACK",
      price: 13.99,
      quantity: 1,
      image: require("../assets/panier1.png"),
    },
    {
      id: "2",
      name: "MAGICAL SLIME - MON COFFRET POTIONS MAGIQUES",
      price: 17.99,
      quantity: 1,
      image: require("../assets/panier2.png"),
    },
  ];

  // Calcul du sous-total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Frais de livraison
  const shippingCost = 4.99;

  // Total final
  const total = subtotal + shippingCost;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <ScrollView style={styles.content}>
        {/* Titre du panier */}
        <Text style={styles.pageTitle}>Mon panier {total.toFixed(2)} €</Text>

        {/* Section des produits */}
        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>
            LES JEUX ET JOUETS LIVRÉS CHEZ VOUS
          </Text>

          {/* Liste des produits */}
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <TouchableOpacity>
                    <Feather name="x" size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                <View style={styles.quantityContainer}>
                  <TextInput
                    style={styles.quantityInput}
                    value={item.quantity.toString()}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.productPrice}>
                  {item.price.toFixed(2)} €
                </Text>
                <TouchableOpacity>
                  <Text style={styles.modifyText}>MODIFIER LA LIVRAISON</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Récapitulatif du montant */}
        <View style={styles.totalSection}>
          <Text style={styles.sectionTitle}>MONTANT TOTAL</Text>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{cartItems.length} ARTICLES</Text>
            <Text style={styles.totalValue}>{subtotal.toFixed(2)} €</Text>
          </View>

          <View style={styles.promoRow}>
            <Text style={styles.promoLabel}>VOUS AVEZ UN CODE PROMO ?</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>FRAIS DE PORT ESTIMÉS</Text>
            <Text style={styles.totalValue}>{shippingCost.toFixed(2)} €</Text>
          </View>

          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>TOTAL</Text>
            <Text style={styles.grandTotalValue}>{total.toFixed(2)} €</Text>
          </View>

          <View style={styles.termsRow}>
            <View style={styles.checkbox}>
              <View style={styles.checkboxInner} />
            </View>
            <Text style={styles.termsText}>
              J'accepte les{" "}
              <Text style={styles.termsLink}>
                conditions générales de vente
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>COMMANDER</Text>
            <Feather name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
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
    padding: 15,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A3160",
    marginBottom: 15,
  },
  cartSection: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0A3160",
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    flex: 1,
    marginRight: 10,
  },
  quantityContainer: {
    width: 50,
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    textAlign: "center",
    padding: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modifyText: {
    fontSize: 12,
    color: "#0A3160",
    textDecorationLine: "underline",
  },
  totalSection: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 15,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 14,
    color: "#555",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  promoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  promoLabel: {
    fontSize: 14,
    color: "#555",
  },
  promoButton: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  promoButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#4CAF50",
  },
  termsText: {
    fontSize: 13,
    color: "#555",
  },
  termsLink: {
    color: "#0A3160",
    textDecorationLine: "underline",
  },
  orderButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orderButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
});
