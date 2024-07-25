import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    header: {
      marginTop: 32,
      paddingVertical: 16,
      paddingHorizontal: 8,

    }
  });

export const Header = (): React.JSX.Element => {
    return (
      <View style={styles.header}>
        <Text>Фото галерея</Text>
      </View>
    );
  }
