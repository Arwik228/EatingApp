
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, } from "react-native";
import config from "./../config/conf";

export default class Product extends Component {
    state = {
        shopID: ""
    }

    async componentDidMount() {
        let shopID = this.props.navigation.getParam('ProductID', false);
        this.setState({ shopID })
    }


    render(props) {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:20}}>{this.state.shopID}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
