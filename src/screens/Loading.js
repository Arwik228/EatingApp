import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/picca-1.png")}
                    resizeMode="contain"
                    style={styles.image}
                ></Image>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(233,233,233,1)"
    },
    image: {
        width: 179,
        height: 191,
        marginTop: 219,
        alignSelf: "center"
    }
});