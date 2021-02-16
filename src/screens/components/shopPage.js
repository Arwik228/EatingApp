import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity } from "react-native";
import CupertinoFooter2 from "./components/navigatorBar";

export default class shopPage extends Component {
    render(props) {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, zIndex: 50 }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#ffffff"
                    />
                    <View>

                    </View>
                </View>
                <CupertinoFooter2
                    active="save"
                    messageCallback={() => this.props.navigation.navigate("Messages")}
                    searchCallback={() => this.props.navigation.navigate("Search")}
                    starCallback={() => this.props.navigation.navigate("Saves")}
                    profileCallback={() => this.props.navigation.navigate("Profile")}
                    style={styles.cupertinoFooter2}>
                </CupertinoFooter2>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    cupertinoFooter2: {
        width: 360,
        height: 51,
        backgroundColor: "#f9f9f9",
    }
});
