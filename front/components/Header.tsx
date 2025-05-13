import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

// Interfaces for TypeScript
interface Category {
  id: string;
  name: string;
}

interface HeaderProps {
  onSearch?: (text: string) => void;
  onCategorySelect?: (category: string) => void;
}

const LaGrandeRecreHeader: React.FC<HeaderProps> = ({
  onSearch,
  onCategorySelect,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(
    Dimensions.get("window").width
  );
  const [searchText, setSearchText] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Update dimensions when screen size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription.remove();
  }, []);

  // Determine if we should show mobile or desktop layout
  const isMobile = windowWidth < 768;

  // Categories for navigation menu
  const categories: Category[] = [
    { id: "all", name: "Toutes" },
    { id: "age", name: "Age" },
    { id: "societe", name: "Jeux de société" },
    { id: "marques", name: "Marques & Héros" },
    { id: "puzzle", name: "Puzzle" },
    { id: "loisirs", name: "Loisirs et création" },
    { id: "educatifs", name: "Jeux éducatifs" },
    { id: "imitation", name: "Jouets d'imitation" },
    { id: "construction", name: "Jeux de construction" },
    { id: "eveil", name: "Jouets d'éveil et peluches" },
    { id: "vehicules", name: "Véhicules et figurines" },
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    setIsMobileMenuOpen(false);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logo component
  const Logo = () => (
    <Image
      source={{ uri: "/api/placeholder/150/80" }}
      style={isMobile ? styles.logoMobile : styles.logoDesktop}
      resizeMode="contain"
    />
  );

  // Mobile Header
  const MobileHeader = () => (
    <View style={styles.mobileHeaderContainer}>
      <View style={styles.mobileTopBar}>
        <TouchableOpacity onPress={toggleMobileMenu}>
          <View style={styles.hamburgerMenu}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <TouchableOpacity style={styles.cartButton}>
          <Feather name="shopping-bag" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {isMobileMenuOpen && (
        <View style={styles.mobileMenu}>
          <View style={styles.searchBarMobile}>
            <TextInput
              style={styles.searchInputMobile}
              placeholder="Je recherche..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchIconMobile}
            >
              <Feather name="search" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.categoriesScrollMobile}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItemMobile}
                onPress={() => handleCategorySelect(category.id)}
              >
                <Text style={styles.categoryTextMobile}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.mobileActionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="person-outline" size={22} color="#0A3160" />
              <Text style={styles.actionButtonText}>Compte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={22} color="#0A3160" />
              <Text style={styles.actionButtonText}>Liste d'envies</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Feather name="shopping-bag" size={22} color="#0A3160" />
              <Text style={styles.actionButtonText}>Panier</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  // Desktop Header
  const DesktopHeader = () => (
    <View style={styles.desktopHeaderContainer}>
      <View style={styles.desktopTopBar}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.storeLocator}>
          <Feather name="map-pin" size={20} color="#0A3160" />
          <Text style={styles.storeText}>Magasins</Text>
        </View>

        <View style={styles.searchBarDesktop}>
          <TextInput
            style={styles.searchInputDesktop}
            placeholder="Je recherche..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>

        <View style={styles.desktopActionButtons}>
          <TouchableOpacity style={styles.actionButtonDesktop}>
            <Ionicons name="person-outline" size={24} color="#0A3160" />
            <Text style={styles.actionButtonTextDesktop}>Compte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonDesktop}>
            <Ionicons name="heart-outline" size={24} color="#0A3160" />
            <Text style={styles.actionButtonTextDesktop}>Liste d'envies</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonDesktop}>
            <Feather name="shopping-bag" size={24} color="#0A3160" />
            <Text style={styles.actionButtonTextDesktop}>Panier</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollDesktop}
      >
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

const styles = StyleSheet.create({
  // Shared styles
  logoDesktop: {
    width: 150,
    height: 80,
  },
  logoMobile: {
    width: 100,
    height: 50,
  },
  logoContainer: {
    alignItems: "center",
  },

  // Mobile styles
  mobileHeaderContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mobileTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#0A3160",
  },
  hamburgerMenu: {
    padding: 8,
  },
  hamburgerLine: {
    width: 24,
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 3,
  },
  cartButton: {
    padding: 8,
  },
  mobileMenu: {
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  searchBarMobile: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInputMobile: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  searchIconMobile: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesScrollMobile: {
    maxHeight: 300,
  },
  categoryItemMobile: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryTextMobile: {
    fontSize: 16,
    color: "#0A3160",
  },
  mobileActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionButtonText: {
    marginTop: 5,
    fontSize: 12,
    color: "#0A3160",
  },

  // Desktop styles
  desktopHeaderContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  desktopTopBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 24,
  },
  storeLocator: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  storeText: {
    marginLeft: 5,
    color: "#0A3160",
    fontWeight: "500",
  },
  searchBarDesktop: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginHorizontal: 20,
    height: 40,
  },
  searchInputDesktop: {
    padding: 10,
    fontSize: 14,
    height: 40,
  },
  desktopActionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonDesktop: {
    alignItems: "center",
    marginLeft: 20,
  },
  actionButtonTextDesktop: {
    marginTop: 5,
    fontSize: 12,
    color: "#0A3160",
  },
  categoriesScrollDesktop: {
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  categoryItem: {
    marginRight: 24,
  },
  categoryText: {
    fontSize: 14,
    color: "#0A3160",
    fontWeight: "500",
  },
});

export default LaGrandeRecreHeader;
