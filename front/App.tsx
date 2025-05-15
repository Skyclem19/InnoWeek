// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/home";
import Produit from "./app/produit";
import Panier from "./app/panier";
import Profil from "./app/profil";
import Quiz from "./app/quiz";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Produit" component={Produit} />
        <Stack.Screen name="Panier" component={Panier} />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
