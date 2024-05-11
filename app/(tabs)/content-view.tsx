import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Make sure to install expo-image-picker
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CameraPassthrough from "@/components/CameraPassthrough";
import { CameraType, useCameraPermissions, CameraView } from "expo-camera";

const ContentView = () => {
  const cameraRef = React.useRef<CameraView>(null);
  const [image, setImage] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [analysisResult, setAnalysisResult] = useState(
    "Capture an image to analyze"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const takePicture = async () => {
    if (!permission?.granted) {
      requestPermission();
      return;
    }

    const picture = await cameraRef.current?.takePictureAsync();
    console.log(picture?.uri);
    if (picture?.uri) {
      setImage(picture?.uri);
      analyzeImage(picture?.uri);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    if (!imageUri) return;
    setIsAnalyzing(true);
    setAnalysisResult("Analyzing image...");
    // Simulate an API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult("Analysis complete. This is your result.");
    }, 2000);
  };

  console.log("image", image);

  return (
    <ImageBackground
      source={require("../../assets/images/background-viewfinder.png")}
      style={styles.background}
    >
      <GestureHandlerRootView style={styles.container}>
        {isAnalyzing && <ActivityIndicator size="large" color="#007AFF" />}
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.analysisResult}>{analysisResult}</Text>
          </>
        ) : (
          <>
            <View style={styles.cameraPassthrough}>
              <CameraPassthrough
                cameraRef={cameraRef}
                permission={permission}
                facing={facing}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonOne} onPress={takePicture}>
                <Icon name="circle-slice-8" size={85} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTwo}
                onPress={() => setFacing(facing === "back" ? "front" : "back")}
              >
                <Icon name="cached" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </GestureHandlerRootView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    marginRight: -100,
    paddingBottom: 60,
  },
  buttonOne: {
    height: 85,
    borderRadius: 42.5,
  },
  buttonTwo: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width to make it perfectly round
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraPassthrough: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  analysisResult: {
    fontSize: 16,
    padding: 20,
  },
  noImageText: {
    fontSize: 16,
    padding: 20,
  },
});

export default ContentView;
