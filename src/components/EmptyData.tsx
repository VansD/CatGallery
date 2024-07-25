import React from "react"
import { StyleSheet, Text, View } from "react-native"

export const EmptyData = (): React.JSX.Element => 
    <View style={styles.container}>
        <Text style={styles.text}>Нет данных</Text>
    </View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 20
    }

})