import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import appStore from "../stores/app";
import photoStore from "../stores/photo";
import menu from "../resources/menu.png";
import { MenuTrigger, MenuOptions, MenuOption, Menu } from "react-native-popup-menu";
import { API_URL_NOT_ACCESS, API_URL_NOT_FOUND, API_URL_OK } from "../config";

export const MenuHead = observer((): React.JSX.Element => {
    const { isOpenedMenu, setIsOpenedMenu, setActiveUrl } = appStore;
    const { currentPage } = photoStore;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const openMenu = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished)
                setIsOpenedMenu(true)
        });
    };
    return <View style={styles.container}>
        <Menu opened={isOpenedMenu}>
            <MenuTrigger onPress={openMenu}>
                <Image source={menu} style={styles.menuImg} />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => {
                    setActiveUrl(API_URL_OK(currentPage)),
                        setIsOpenedMenu(false)
                }}>
                    <Text style={styles.text}>Успешный запрос</Text>
                </MenuOption>
                <MenuOption onSelect={() => {
                    setActiveUrl(API_URL_NOT_FOUND)
                    setIsOpenedMenu(false)
                }}>
                    <Text style={styles.text}>Страница не найдена</Text>
                </MenuOption>
                <MenuOption onSelect={() => {
                    setActiveUrl(API_URL_NOT_ACCESS)
                    setIsOpenedMenu(false)
                }}>
                    <Text style={styles.text}>Ресурс заблокирован</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    </View>
})

const styles = StyleSheet.create({
    menuImg: {
        width: 28,
        height: 28,
        borderWidth: 2,
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: 25,
        
    },
    container: {
        marginRight: 42,
        marginTop: 10
    },
    text: {
        margin: 5,
        fontSize: 16,
        zIndex: 100,
        color: "black"
    }
})