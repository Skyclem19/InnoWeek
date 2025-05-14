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
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Interfaces for TypeScript
interface Category {
  id: string;
  name: string;
  route?: string;
}

interface HeaderProps {
  onSearch?: (text: string) => void;
  onCategorySelect?: (category: string) => void;
}

const LaGrandeRecreHeader: React.FC<HeaderProps> = ({
  onSearch,
  onCategorySelect,
}) => {
  const navigation = useNavigation<any>();
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

  // Set status bar color
  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#0A3160");
  }, []);

  // Determine if we should show mobile or desktop layout
  const isMobile = windowWidth < 768;

  // Categories for navigation menu
  const categories: Category[] = [
    { id: "all", name: "Toutes" },
    { id: "age", name: "Age" },
    { id: "societe", name: "Jeux de société", route: "Produit" },
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
    // Trouver la catégorie sélectionnée
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );

    // Si la catégorie a une route définie, naviguer vers cette route
    if (selectedCategory?.route) {
      navigation.navigate(selectedCategory.route);
    } else if (onCategorySelect) {
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
      source={require("../assets/lgr.png")}
      style={isMobile ? styles.logoMobile : styles.logoDesktop}
      resizeMode="contain"
    />
  );

  // Navigation handlers
  const navigateTo = (route: string) => {
    navigation.navigate(route);
    setIsMobileMenuOpen(false);
  };

  // Mobile Header
  const MobileHeader = () => (
    <View style={styles.mobileHeaderContainer}>
      <View style={styles.statusBarBackground} />
      <SafeAreaView style={{ backgroundColor: "#0A3160" }}>
        <View style={styles.mobileTopBar}>
          <TouchableOpacity
            onPress={toggleMobileMenu}
            style={styles.hamburgerButton}
          >
            <View style={styles.hamburgerMenu}>
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
            </View>
          </TouchableOpacity>

          <View style={styles.logoContainerMobile}>
            <TouchableOpacity onPress={() => navigateTo("Home")}>
              <Logo />
            </TouchableOpacity>
          </View>

          <View style={styles.mobileActionIcons}>
            <TouchableOpacity style={styles.actionIconMobile}>
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconMobile}
              onPress={() => navigateTo("Profil")}
            >
              <Ionicons name="person-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconMobile}
              onPress={() => navigateTo("Panier")}
            >
              <Feather name="shopping-bag" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Barre de recherche mobile */}
        <View style={styles.searchBarMobileTop}>
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
      </SafeAreaView>

      {isMobileMenuOpen && (
        <View style={styles.mobileMenu}>
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
        </View>
      )}
    </View>
  );

  // Desktop Header
  const DesktopHeader = () => (
    <View style={styles.desktopHeaderContainer}>
      <View style={styles.statusBarBackground} />
      <SafeAreaView style={{ backgroundColor: "#0A3160" }}>
        {/* Première ligne: Logo et Actions */}
        <View style={styles.desktopTopBar}>
          <View style={styles.desktopActionButtons}>
            <TouchableOpacity style={styles.actionButtonDesktop}>
              <Ionicons name="heart-outline" size={24} color="white" />
              <Text style={styles.actionButtonTextDesktop}>Liste d'envies</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButtonDesktop}
              onPress={() => navigateTo("Profil")}
            >
              <Ionicons name="person-outline" size={24} color="white" />
              <Text style={styles.actionButtonTextDesktop}>Compte</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoContainerDesktop}
            onPress={() => navigateTo("Home")}
          >
            <Logo />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonDesktop}
            onPress={() => navigateTo("Panier")}
          >
            <Feather name="shopping-bag" size={24} color="white" />
            <Text style={styles.actionButtonTextDesktop}>Panier</Text>
          </TouchableOpacity>
        </View>

        {/* Deuxième ligne: Barre de recherche */}
        <View style={styles.searchBarContainerDesktop}>
          <View style={styles.searchBarDesktop}>
            <TextInput
              style={styles.searchInputDesktop}
              placeholder="Je recherche..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity
              style={styles.searchIconDesktop}
              onPress={handleSearch}
            >
              <Feather name="search" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

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
  statusBarBackground: {
    height: StatusBar.currentHeight,
    backgroundColor: "#0A3160",
  },
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
  logoContainerMobile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  logoContainerDesktop: {
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    padding: 10,
    backgroundColor: "#0A3160",
    position: "relative", // Important pour le positionnement absolu des enfants
  },
  hamburgerButton: {
    position: "absolute",
    left: 10,
    zIndex: 10,
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
  mobileActionIcons: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
  actionIconMobile: {
    padding: 8,
    marginLeft: 5,
  },
  searchBarMobileTop: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 10,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  menuItemMobile: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuItemTextMobile: {
    fontSize: 16,
    color: "#0A3160",
    marginLeft: 10,
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 24,
    backgroundColor: "#0A3160",
  },
  searchBarContainerDesktop: {
    backgroundColor: "#0A3160",
    paddingHorizontal: 24,
    paddingBottom: 15,
  },
  searchBarDesktop: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
  },
  searchInputDesktop: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    height: 40,
  },
  searchIconDesktop: {
    padding: 10,
  },
  desktopActionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonDesktop: {
    alignItems: "center",
    marginLeft: 30,
    flexDirection: "row",
  },
  actionButtonTextDesktop: {
    marginLeft: 8,
    fontSize: 14,
    color: "white",
    fontWeight: "500",
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
