import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default class Comfirm extends Component {
    render(props) {
        return (
            <View style={styles.container}>
                <View style={styles.block}>
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 16 }}>{this.props.text}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.off()} style={[styles.button, { backgroundColor: "orange" }]}>
                            <Text style={{ color: "white", fontSize: 20 }}>Отмена</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.confirm()} style={[styles.button, { backgroundColor: "lime" }]}>
                            <Text style={{ color: "white", fontSize: 20 }}>Подтвердить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 50,
        zIndex: 51,
        backgroundColor: "#00000032",
        display: "flex",
        justifyContent: "center"
    },
    block: {
        backgroundColor: "#fff",
        left: 30,
        width: 300,
        borderRadius: 7,
        padding: 10

    },
    button: {
        backgroundColor: "gray",
        padding: 6,
        borderRadius: 5
    }
});
