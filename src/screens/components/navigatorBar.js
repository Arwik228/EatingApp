import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default class CupertinoFooter2 extends Component {
    render(props) {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity
                    onPress={() => { this.props.messageCallback(); }}
                    style={styles.btnWrapper1}
                >
                    <IoniconsIcon
                        name={this.props.icon || "ios-chatbubbles"}
                        style={[
                            styles.icon,
                            {
                                color: this.props.active == "message" ? "#739fcc" : "#a3a8af"
                            }
                        ]}
                    ></IoniconsIcon>
                    <Text
                        style={[
                            styles.message,
                            {
                                color: this.props.active == "message" ? "#739fcc" : "#9E9E9E"
                            }
                        ]}
                    >
                        {this.props.message || "Сообщения"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { this.props.searchCallback(); }}
                    style={styles.btnWrapper3}
                >
                    <MaterialCommunityIconsIcon
                        name={this.props.icon2 || "cloud-search"}
                        style={[
                            styles.icon2,
                            {
                                color: this.props.active == "search" ? "#739fcc" : "#a3a8af"
                            }
                        ]}
                    ></MaterialCommunityIconsIcon>
                    <Text
                        style={[
                            styles.search,
                            {
                                color: this.props.active == "search" ? "#739fcc" : "#9E9E9E"
                            }
                        ]}
                    >
                        {this.props.search || "Поиск"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { this.props.starCallback(); }}
                    style={styles.btnWrapper4}
                >
                    <MaterialCommunityIconsIcon
                        name={this.props.icon3 || "star"}
                        style={[
                            styles.icon3,
                            {
                                color: this.props.active == "save" ? "#739fcc" : "#a3a8af"
                            }
                        ]}
                    ></MaterialCommunityIconsIcon>
                    <Text
                        style={[
                            styles.stars,
                            {
                                color: this.props.active == "save" ? "#739fcc" : "#9E9E9E"
                            }
                        ]}
                    >
                        {this.props.stars || "Сохраненные"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { this.props.profileCallback(); }}
                    style={styles.btnWrapper5}
                >
                    <MaterialCommunityIconsIcon
                        name={this.props.icon4 || "account"}
                        style={[
                            styles.icon4,
                            {
                                color: this.props.active == "profile" ? "#739fcc" : "#a3a8af"
                            }
                        ]}
                    ></MaterialCommunityIconsIcon>
                    <Text
                        style={[
                            styles.profile,
                            {
                                color: this.props.active == "profile" ? "#739fcc" : "#9E9E9E"
                            }
                        ]}
                    >
                        {this.props.profile || "Профиль"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,1)",
        justifyContent: "space-between"
    },
    btnWrapper1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        backgroundColor: "transparent",
        opacity: 0.8,
        fontSize: 24
    },
    message: {
        backgroundColor: "transparent",
        paddingTop: 4,
        fontSize: 12,
        textAlign: "center"
    },
    btnWrapper3: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    icon2: {
        backgroundColor: "transparent",
        opacity: 0.8,
        fontSize: 24,
        color: "#a3a8af"
    },
    search: {
        backgroundColor: "transparent",
        paddingTop: 4,
        fontSize: 12,
        color: "#9E9E9E",
        textAlign: "center"
    },
    btnWrapper4: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    icon3: {
        backgroundColor: "transparent",
        opacity: 0.8,
        fontSize: 24,
        color: "#a3a8af"
    },
    stars: {
        backgroundColor: "transparent",
        paddingTop: 4,
        fontSize: 12,
        color: "#9E9E9E",
        textAlign: "center"
    },
    btnWrapper5: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    icon4: {
        backgroundColor: "transparent",
        opacity: 0.8,
        fontSize: 24,
        color: "#a3a8af"
    },
    profile: {
        backgroundColor: "transparent",
        paddingTop: 4,
        fontSize: 12,
        color: "#9E9E9E",
        textAlign: "center"
    }
});
