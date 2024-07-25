import { View, Image, StyleSheet } from "react-native";

//not showing
import loaderGif from "../resources/loader.gif";

export const Loader = () => {
  return <View style={styles.container}>
    <Image source={loaderGif} style={styles.img} />
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginTop: 450,
    width: 300,
    height: 300
  }
})