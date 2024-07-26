import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { Loader } from "../../components/Loader";
import { useState } from "react";
import { PHOTO_HEIGHT_WITH_MARGIN, PHOTO_WIDTH_WITH_MARGIN } from "../../config";

export type PhotoProps = {
  title: string;
  url: string;
  page: number;
  index: number;
};

export const Photo = ({ title, url, page, index }: PhotoProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <View style={styles.sectionContainer}>
      <FastImage source={{ uri: url, priority: FastImage.priority.normal }}
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
    width: PHOTO_WIDTH_WITH_MARGIN,
    height: PHOTO_HEIGHT_WITH_MARGIN
  }
});
