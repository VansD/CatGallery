import { View, StyleSheet } from "react-native";
import loaderGif from "../resources/loader.gif";
import FastImage from "react-native-fast-image";

export const Loader = () => {
  return <View style={styles.container}>
    <FastImage source={loaderGif} style={styles.img} />
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
  }
})