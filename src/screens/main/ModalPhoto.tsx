import { Image, Modal, StyleSheet, View, Animated, Text, TouchableOpacity, Button } from "react-native"
import React, { useCallback } from "react"
import photoStore from "../../stores/photo";
import { observer } from "mobx-react-lite";
import ImageViewer from 'react-native-image-zoom-viewer';

type ModalPhotoProps = {
    close: () => void;
    url?: string | null;
    index?: number | null;
}

export const ModalPhoto = observer(({ index, close }: ModalPhotoProps): React.JSX.Element => {
    const {photos} = photoStore;
    const photoUrls = photos.map(photo => { return {url: photo.url}})
    return <Modal visible={index != null} animationType="slide">
        <View style={styles.container} >
            <TouchableOpacity onPressIn={close}>
                <Animated.Text style={styles.closeButton}>x</Animated.Text>
            </TouchableOpacity>
            <ImageViewer imageUrls={photoUrls} 
                index={index ?? undefined}
                style={styles.img} 
                minScale={0.5}
                maxScale={5}/>

        </View>
    </Modal>
})

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    img: {
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: -1
    },
    closeButton: {
        zIndex: 100000,
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 5,
        right: 5,
        height: 40,
        borderWidth: 1,
        textAlign: "center",
        textAlignVertical: "center",
        width: 40,
        backgroundColor: "black",
        color: "white",
        borderRadius: 25,
        borderColor: "white",
        fontSize: 24,
        paddingBottom: 5
    }
})