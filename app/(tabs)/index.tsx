import React, { useState } from "react";
import ContentView from "./content-view";
import { View, Text, ImageBackground, StyleSheet, Button } from "react-native";

const LandingScreen = () => {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    // Replace 'ContentView' with your main content component for React Native
    return <ContentView />;
  } else {
    return (
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Cultura</Text>
            <Text style={styles.slashText}>/</Text>
          </View>
          <Text style={styles.description}>
            Explore the world of art like never before with Cultura.
          </Text>
          <Text style={styles.description}>
            Unlock the stories behind a piece of artwork by snapping a photo.
            Whether it's a famous painting in a museum or a fascinating street
            mural you'll receive an in-depth analysis of the piece.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={() => setIsActive(true)}
              color="black"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  slashText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
});

export default LandingScreen;
