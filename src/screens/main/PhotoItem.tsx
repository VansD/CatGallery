import { Image, StyleSheet, View } from "react-native";

export type PhotoProps = {
  title: string;
  url: string;
  page: number;
  index: number;
};

export const Photo = ({ title, url, page, index }: PhotoProps): React.JSX.Element => {
  return (
    <View style={styles.sectionContainer}>
      <Image source={{ uri: url }} alt={title}
        resizeMode="cover" style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    color: "white"
  },
  img: {
    borderRadius: 16,
    width: 160,
    height: 160
  }
});
