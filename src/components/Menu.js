import React, { useContext } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as RootNavigation   from '../routers/RootNavigation';
import { useSelector } from "react-redux";
import { AuthContext } from "../context/Auth";

export const Menu = () => {
    const wordsInStore = useSelector(state => state.words)
    const { currentUser } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => RootNavigation.navigate("homepage")}>
                <Image style={styles.logo} source={require("../image/homepage.png")}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => currentUser ? RootNavigation.navigate("bookmark") : undefined}>
                <Image style={currentUser ? styles.logo : styles.loadingLogo} source={require("../image/bookmark.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => wordsInStore.length >= 1 ? RootNavigation.navigate("revise") : undefined}>
                <Image style={wordsInStore.length >= 1 ? styles.logo : styles.loadingLogo} source={require("../image/revise.png")}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#a58482",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: "2%"
    },
    button: {
        borderLeftColor: "#2F4F4F",
        borderLeftWidth: 1,
        borderRightColor: "#2F4F4F",
        borderRightWidth: 1,
        paddingHorizontal: "12.5%"
    },
    logo: {
        height: 30,
        width: 30
    },
    loadingLogo: {
        height: 30,
        opacity: 0.2,
        width: 30
    }
})