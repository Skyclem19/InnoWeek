import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import {
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Home() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  const { width } = Dimensions.get("window");
  const carouselTimer = useRef(null);

  // Images du carousel principal
  const carouselData = [
    {
      id: "1",
      image: require("../assets/carousel_barbie.png"),
      title: "-30% sur tous les jouets Barbie",
      subtitle: "Tu peux être tout ce que tu veux",
    },
    {
      id: "2",
      image: require("../assets/carousel_outdoor.png"),
      title: "C'est l'heure de jouer dehors !",
      subtitle: "Découvrez notre sélection de plein air",
    },
    {
      id: "3",
      image: require("../assets/carousel_fete_meres.png"),
      title: "Un cadeau parfait pour maman",
      subtitle: "Fête des mères - 26 mai 2025",
    },
  ];

  // Catégories par âge
  const ageCategories = [
    { id: "1", age: "0-12 MOIS", icon: require("../assets/age_bebe.png") },
    { id: "2", age: "1-3 ANS", icon: require("../assets/age_bambin.png") },
    { id: "3", age: "3-6 ANS", icon: require("../assets/age_maternelle.png") },
    { id: "4", age: "6-8 ANS", icon: require("../assets/age_primaire.png") },
    { id: "5", age: "9-11 ANS", icon: require("../assets/age_junior.png") },
    { id: "6", age: "12 ANS ET +", icon: require("../assets/age_ado.png") },
    { id: "7", age: "ADULTES", icon: require("../assets/age_adulte.png") },
  ];

  // Promotions spéciales
  const specialOffers = [
    {
      id: "1",
      image: require("../assets/promo_aquarium.png"),
      title: "-50%",
      subtitle: "sur l'Aquarium ZhuZhu",
    },
    {
      id: "2",
      image: require("../assets/promo_velo.png"),
      title: "Jusqu'à 8€",
      subtitle: "REMBOURSÉS sur les vélos",
    },
  ];

  // Thématiques populaires
  const popularThemes = [
    {
      id: "1",
      image: require("../assets/theme_pirates.png"),
      title: "AVENTURES PIRATES",
    },
    {
      id: "2",
      image: require("../assets/theme_dinos.png"),
      title: "DINOSAURES",
    },
    {
      id: "3",
      image: require("../assets/theme_licornes.png"),
      title: "LICORNES",
    },
    {
      id: "4",
      image: require("../assets/theme_nouveautes.png"),
      title: "NOUVEAUTÉS",
    },
  ];

  // Marques et héros populaires
  const popularBrands = [
    { id: "1", image: require("../assets/brand_stitch.png"), name: "Stitch" },
    {
      id: "2",
      image: require("../assets/brand_pawpatrol.png"),
      name: "Paw Patrol",
    },
    { id: "3", image: require("../assets/brand_barbie.png"), name: "Barbie" },
    {
      id: "4",
      image: require("../assets/brand_harrypotter.png"),
      name: "Harry Potter",
    },
    { id: "5", image: require("../assets/brand_pokemon.png"), name: "Pokémon" },
  ];

  // Produits tendance
  const trendingProducts = [
    {
      id: "1",
      image: require("../assets/product_atelier.png"),
      name: "ATELIER ÉTABLI - GRAND MODÈLE",
      price: "34.99 €",
    },
    {
      id: "2",
      image: require("../assets/product_photo.png"),
      name: "APPAREIL PHOTO NUMERIQUE - PHOTO CREATOR POP COLOUR",
      price: "35.99 €",
    },
    {
      id: "3",
      image: require("../assets/product_maison.png"),
      name: "MAISON DE PLAGE EN BOIS",
      price: "49.99 €",
    },
    {
      id: "4",
      image: require("../assets/product_retro.png"),
      name: "CONSOLE RÉTRO - CONSTRUCTION À FAIRE",
      price: "69.99 €",
    },
  ];

  // Défilement automatique du carousel
  useEffect(() => {
    startCarouselTimer();
    return () => clearInterval(carouselTimer.current);
  }, [currentCarouselIndex]);

  const startCarouselTimer = () => {
    clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(() => {
      const nextIndex = (currentCarouselIndex + 1) % carouselData.length;
      setCurrentCarouselIndex(nextIndex);
      carouselRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 5000);
  };

  const handleCarouselScroll = (event) => {
    const slideWidth = width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideWidth);
    if (index !== currentCarouselIndex) {
      setCurrentCarouselIndex(index);
    }
  };

  // Rendu d'un élément du carousel
  const renderCarouselItem = ({ item, index }) => (
    <View style={[styles.carouselItem, { width }]}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.carouselOverlay}>
        <View style={styles.carouselContent}>
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
          <TouchableOpacity style={styles.carouselButton}>
            <Text style={styles.carouselButtonText}>J'en profite !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Indicateurs du carousel
  const renderCarouselDots = () => (
    <View style={styles.carouselDotsContainer}>
      {carouselData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.carouselDot,
            index === currentCarouselIndex && styles.carouselDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A3160" barStyle="light-content" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Carousel principal */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={carouselRef}
            data={carouselData}
            renderItem={renderCarouselItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleCarouselScroll}
            initialScrollIndex={0}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />
          {renderCarouselDots()}
        </View>

        {/* Catégories par âge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Les jeux et jouets par âge</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ageCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.ageCategory}>
                <Image source={category.icon} style={styles.ageCategoryIcon} />
                <Text style={styles.ageCategoryText}>{category.age}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promotions spéciales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Des offres à couper le souffle !
          </Text>
          <View style={styles.specialOffersContainer}>
            {specialOffers.map((offer) => (
              <TouchableOpacity key={offer.id} style={styles.specialOfferCard}>
                <Image source={offer.image} style={styles.specialOfferImage} />
                <View style={styles.specialOfferOverlay}>
                  <Text style={styles.specialOfferTitle}>{offer.title}</Text>
                  <Text style={styles.specialOfferSubtitle}>
                    {offer.subtitle}
                  </Text>
                  <TouchableOpacity style={styles.specialOfferButton}>
                    <Text style={styles.specialOfferButtonText}>
                      J'en profite
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Thématiques populaires */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À ne pas manquer !</Text>
          <View style={styles.themesGrid}>
            {popularThemes.map((theme) => (
              <TouchableOpacity key={theme.id} style={styles.themeCard}>
                <Image source={theme.image} style={styles.themeImage} />
                <View style={styles.themeOverlay}>
                  <Text style={styles.themeTitle}>{theme.title}</Text>
                </View>
                <View style={styles.discoverButtonContainer}>
                  <Text style={styles.discoverText}>Je découvre</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section d'inspiration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En manque d'inspiration ?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.brandsContainer}
          >
            {popularBrands.map((brand) => (
              <TouchableOpacity key={brand.id} style={styles.brandCard}>
                <Image source={brand.image} style={styles.brandImage} />
                <Text style={styles.brandName}>{brand.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.viewAllBrandsButton}>
            <Text style={styles.viewAllBrandsText}>
              VOIR TOUTES NOS MARQUES
            </Text>
            <Feather name="arrow-right" size={15} color="#0A3160" />
          </TouchableOpacity>
        </View>

        {/* Produits tendance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Les produits du moment</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productsContainer}
          >
            {trendingProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Nos services</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <FontAwesome5 name="store" size={24} color="#0A3160" />
              </View>
              <Text style={styles.serviceTitle}>Click & Collect</Text>
              <Text style={styles.serviceDescription}>
                Commandez en ligne et retirez en magasin gratuitement en 2h
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <Feather name="truck" size={24} color="#0A3160" />
              </View>
              <Text style={styles.serviceTitle}>Livraison gratuite</Text>
              <Text style={styles.serviceDescription}>
                Dès 45€ d'achat, livraison à domicile en 24-72h
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <MaterialCommunityIcons name="gift" size={24} color="#0A3160" />
              </View>
              <Text style={styles.serviceTitle}>Carte cadeau</Text>
              <Text style={styles.serviceDescription}>
                Faites plaisir à coup sûr avec nos cartes cadeaux
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <Ionicons name="star" size={24} color="#0A3160" />
              </View>
              <Text style={styles.serviceTitle}>Fidélité</Text>
              <Text style={styles.serviceDescription}>
                1€ dépensé = 1 point, cumulez et obtenez des réductions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Newsletter */}
        <View style={styles.newsletterSection}>
          <View style={styles.newsletterContent}>
            <Text style={styles.newsletterTitle}>
              Restez informé de nos actualités et offres !
            </Text>
            <Text style={styles.newsletterDescription}>
              Inscrivez-vous à notre newsletter et recevez 10% de réduction sur
              votre prochaine commande
            </Text>
            <TouchableOpacity style={styles.newsletterButton}>
              <Text style={styles.newsletterButtonText}>JE M'INSCRIS</Text>
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
  scrollView: {
    flex: 1,
  },

  // Styles pour le carousel principal
  carouselContainer: {
    height: 250,
    position: "relative",
    marginBottom: 20,
  },
  carouselItem: {
    position: "relative",
    height: 250,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  carouselOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  carouselContent: {
    maxWidth: "70%",
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  carouselSubtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  carouselButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  carouselButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  carouselDotsContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    flexDirection: "row",
  },
  carouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginLeft: 8,
  },
  carouselDotActive: {
    backgroundColor: "#FFF",
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // Styles pour les sections
  section: {
    backgroundColor: "white",
    marginBottom: 15,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A3160",
    marginBottom: 15,
    marginHorizontal: 15,
  },

  // Styles pour les catégories par âge
  ageCategory: {
    alignItems: "center",
    marginHorizontal: 10,
    width: 80,
  },
  ageCategoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e8f5e9",
    marginBottom: 8,
  },
  ageCategoryText: {
    fontSize: 12,
    textAlign: "center",
    color: "#0A3160",
    fontWeight: "500",
  },

  // Styles pour les offres spéciales
  specialOffersContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  specialOfferCard: {
    flex: 1,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  specialOfferImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  specialOfferOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  specialOfferTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  specialOfferSubtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  specialOfferButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  specialOfferButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },

  // Styles pour les thématiques
  themesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  themeCard: {
    width: "50%",
    paddingHorizontal: 5,
    paddingBottom: 15,
    position: "relative",
  },
  themeImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  themeOverlay: {
    position: "absolute",
    top: 0,
    left: 5,
    right: 5,
    height: 120,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  themeTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  discoverButtonContainer: {
    backgroundColor: "#f4f4f4",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  discoverText: {
    color: "#0A3160",
    fontSize: 12,
    fontWeight: "500",
  },

  // Styles pour les marques
  brandsContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  brandCard: {
    alignItems: "center",
    marginHorizontal: 10,
    width: 90,
  },
  brandImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: "#f1f8e9",
  },
  brandName: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  viewAllBrandsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    paddingVertical: 10,
  },
  viewAllBrandsText: {
    color: "#0A3160",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },

  // Styles pour les produits tendance
  productsContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A3160",
  },

  // Styles pour les services
  servicesSection: {
    backgroundColor: "white",
    marginBottom: 15,
    paddingVertical: 15,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  serviceCard: {
    width: "50%",
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },

  // Styles pour la newsletter
  newsletterSection: {
    backgroundColor: "#0A3160",
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  newsletterContent: {
    alignItems: "center",
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  newsletterDescription: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    opacity: 0.9,
  },
  newsletterButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  newsletterButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
