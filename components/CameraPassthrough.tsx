import React from "react";
import { StyleSheet, View } from "react-native";
import { CameraView, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const CameraPassthrough = ({
  permission,
  facing,
  cameraRef,
}: {
  permission: ImagePicker.PermissionResponse | null;
  facing: CameraType;
  cameraRef: React.MutableRefObject<CameraView | null>;
}) => {
  if (!permission?.granted) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref) => {
          (cameraRef.current as any) = ref;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "65%",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default CameraPassthrough;
