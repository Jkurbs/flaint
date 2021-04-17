import React from "react";
import AppLoading from "expo-app-loading";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Dimensions,
  PixelRatio,
} from "react-native";

import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import { FlatGrid } from "react-native-super-grid";

import {
  useFonts,
  DancingScript_400Regular,
  DancingScript_500Medium,
} from "@expo-google-fonts/dancing-script";

const { width: windowWidth } = Dimensions.get("screen");
const itemDimension = windowWidth / 3;

var renderer, scene, camera, cube;

function getPixelRatio() {
  return PixelRatio.get() <= 2;
}

const url = "https://s4lnqpx6qg2.typeform.com/to/h5G5KNXz";

const featuresData = [
  {
    title: "Add to your gallery",
    description:
      "Add any type of paintings to your gallery walls in a personalized, appealing, fast and reliable way.",
    image: require("./assets/feature-2.png"),
  },
  {
    title: "Customize your gallery",
    description:
      "Customize your gallery in a way that's personal to you but appealing to your target audience.",
    image: require("./assets/feature-1.png"),
  },

  {
    title: "Share with the outside world",
    description: "Easily share with the world with the click of a button.",
    image: require("./assets/feature-3.png"),
  },
];

function openApplyLink() {
  const supported = Linking.canOpenURL(url);
  if (supported) {
    Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
}

export default function App() {
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_500Medium,
  });
  // componentWillMount() {
  //   THREE.suppressExpoWarnings();
  // }

  const navigateToPrivacy = () => {
    // Navigate to privacy
  };

  // This is called by the `ExpoGraphics.View` once it's initialized
  const onContextCreate = async ({ gl, width, height, scale: pixelRatio }) => {
    renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    renderer.setClearColor(0xffffff);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(5, 7, 0.1);

    const loader = new THREE.TextureLoader();

    const material = new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=790&q=80"
      ),
    });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    scene.add(light);
  };

  const onRender = (delta) => {
    //cube.rotation.x += 3.5 * delta;
    // cube.rotation.y += 2 * delta;
    renderer.render(scene, camera);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
          <View style={styles.logoView}>
            <Image />
            <Text style={styles.logo}>Flaint</Text>
          </View>
        </View>
        <View
          style={[
            styles.wrapper,
            { flexDirection: getPixelRatio() ? "row" : "column" },
          ]}
        >
          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>
              {getPixelRatio()
                ? "The Most advanced painting\ngallery."
                : "The Most advanced\npainting gallery."}
            </Text>
            <Text style={styles.description}>
              Flaint is developing a way to allow painters who value their work
              to create an appealing virtual art gallery that drives more sales
              and exposure.
            </Text>
            <TouchableOpacity
              onPress={() => openApplyLink()}
              style={[
                styles.accessButton,
                { alignSelf: getPixelRatio() ? "auto" : "center" },
              ]}
            >
              <Text style={styles.accessButtonText}>Request access</Text>
            </TouchableOpacity>
          </View>
          {/* 3D Content */}

          {getPixelRatio() ? (
            <GraphicsView
              style={styles.artContainer}
              onContextCreate={onContextCreate}
              onRender={onRender}
            />
          ) : null}
        </View>
        <FlatGrid
          itemDimension={getPixelRatio() ? itemDimension : windowWidth}
          data={featuresData}
          bordered={false}
          horizontal={getPixelRatio() ? false : false}
          spacing={0}
          renderItem={({ index, item }) => (
            <View
              style={[
                styles.featuresView,
                {
                  borderRightColor: index % 1 == 0 ? "#E1E4E8" : "transparant",
                  borderRightWidth: index % 1 == 0 ? 1 : 0,
                },
              ]}
            >
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDescription}>{item.description}</Text>
              <Image
                resizeMethod={"cover"}
                style={styles.featureImage}
                source={item.image}
              />
            </View>
          )}
        />

        <View style={styles.footer}>
          <Text onPress={navigateToPrivacy} style={styles.link}>
            Privacy Policy
          </Text>
          <Text onPress={navigateToPrivacy}>
            © FLAINT 2021, ALL RIGHTS RESERVED.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    textAlign: getPixelRatio() ? "left" : "center",
  },

  navigation: {
    padding: 20,
  },

  logoView: {
    flexDirection: "row",
    justifyContent: getPixelRatio() ? "auto" : "center",
  },

  logo: {
    fontSize: 25,
    fontWeight: "600",
    fontFamily: "DancingScript_400Regular",
  },

  wrapper: {
    paddingBottom: 60,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E4E8",
  },

  content: {
    padding: 20,
    paddingTop: 60,
    width: "50%",
  },

  title: {
    fontWeight: "600",
    fontSize: getPixelRatio() ? 45 : 30,
  },

  description: {
    marginTop: 15,
    fontSize: 17,
    color: "#586069",
    textAlign: getPixelRatio() ? "left" : "center",
  },

  accessButton: {
    marginTop: 20,
    width: 150,
    height: 50,
    backgroundColor: "#DB2222",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  accessButtonText: {
    alignSelf: "center",
    fontWeight: "600",
    color: "white",
  },

  artContainer: {
    width: 500,
    height: 500,
    marginRight: 60,
  },

  featuresView: {
    marginBottom: 60,
    padding: 40,
    height: getPixelRatio() ? itemDimension * 1.2 : windowWidth,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E4E8",
  },

  featureTitle: {
    fontWeight: "600",
    fontSize: 25,
  },

  featureDescription: {
    marginTop: 30,
    fontSize: 15,
    color: "#586069",
  },

  featureImage: {
    marginTop: 30,
    marginBottom: 30,
    width: "40%",
    height: "40%",
    alignSelf: "center",
  },

  footer: {
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  link: {
    marginBottom: 8,
    fontWeight: "500",
  },
});
