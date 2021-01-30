import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";
import config from "./../config/conf";
import AsyncStorage from '@react-native-community/async-storage'
import CupertinoFooter2 from "./components/navigatorBar";
import Comfirm from "./components/confirm";
import FormShopCreate from "./components/formShopCreate";
import FormShopUpdate from "./components/formShopUpdate";

export default class Profile extends Component {
    color = [
        "#f4b300", "#78ba00", "#2673ec", "#ae113d", "#632f00", "#b01e00", "#7200ac",
        "#4617b4", "#006ac1", "#008287", "#199900", "#00c13f", "#ff981d", "#ff2e12",
        "#ff1d77", "#aa40ff", "#1faeff", "#56c5ff", "#00d8cc", "#91d100", "#e1b700",
        "#ff76bc", "#00a4a4", "#ff7d23", "#252525", "#1f0068", "#004d60", "#15992a",
        "#e56c19", "#b81b1b", "#b81b6c", "#1b58b8", "#569ce3", "#00aaaa", "#83ba1f",
        "#e064b7", "#696969"
    ];

    state = {
        defaultFirstname: "", defaultLastname: "",
        defaultNumber: "", defaultPassword: "",
        newFirstname: "", newLastname: "",
        newNumber: "", newPassword: "",
        errorText: "", shop: {},
        stores: [], create: false, edit: false
    }

    createShop = () => {
        this.setState({ create: true })
    }

    openShop = (id) => {

    }

    async editShop(id) {
        let stores = JSON.parse(await AsyncStorage.getItem("userInfo"))['stores']
        this.setState({ edit: stores.filter(e => e.id === id)[0].id })
    }

    async deleteShopConfirm(id) {
        let stores = JSON.parse(await AsyncStorage.getItem("userInfo"))['stores']
        this.setState({ shop: stores.filter(e => e.id === id)[0] })
    }

    async deleteShop() {
        let id = this.state.shop.id;
        let token = JSON.parse(await AsyncStorage.getItem("token"));
        let double = JSON.parse(await AsyncStorage.getItem("double"));
        fetch(`${config.host}/api/deleteShop/${token}/${id}/${double}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((response) => { return response.json() }).then(async (data) => {
            if (data.response.status == "ok") {
                let user = JSON.parse(await AsyncStorage.getItem("userInfo"));
                user.stores = user.stores.filter(e => e.id != id)
                await AsyncStorage.setItem("userInfo", JSON.stringify(user))
                await this.componentDidMount();
                this.setState({ errorText: "Магазин Удален", shop: {} });
                setTimeout(() => { this.setState({ errorText: "" }); }, 2500)
            } else {
                this.setState({ errorText: data.response.info })
            }
        }).catch((e) => {
            this.setState({ errorText: "Ошибка соединения" })
        })
        this.setState({ shop: {} })
    }

    saveSettings = async () => {
        let firstname = this.state.newFirstname || "";
        let lastname = this.state.newLastname || "";
        let number = this.state.newNumber || "";
        let password = this.state.newPassword || "";
        if (!firstname && !lastname && !number && !password)
            return;
        let token = JSON.parse(await AsyncStorage.getItem("token"));
        fetch(`${config.host}/api/updateData/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                number, password, firstname, lastname
            })
        }).then((response) => { return response.json() }).then(async (data) => {
            if (data.response.status == "ok") {
                let obj = JSON.parse(await AsyncStorage.getItem("userInfo"));
                await AsyncStorage.setItem("userInfo", JSON.stringify(
                    {
                        createdAt: obj.createdAt,
                        id: obj.id, stores: obj.stores,
                        firstname: (firstname ? firstname : obj.firstname),
                        lastname: (lastname ? lastname : obj.lastname),
                        number: (number ? number : obj.number),
                        password: (password ? password : obj.password),
                    }
                ));
                this.setState({ newFirstname: "", newLastname: "", newNumber: "", newPassword: "", errorText: "Информация сохранена" });
                setTimeout(() => { this.setState({ errorText: "" }); }, 2500)
            } else {
                this.setState({ errorText: data.response.info })
            }
        }).catch((e) => {
            this.setState({ errorText: "Ошибка соединения" })
        })
    }

    async componentDidMount() {
        let userInfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
        if (userInfo) {
            let arrayStores = userInfo.stores.map((arr) =>
                <TouchableOpacity onPress={() => { this.openShop(arr.id) }}
                    style={[styles.block, { padding: 5, backgroundColor: this.color[[Math.floor(Math.random() * this.color.length)]] }]}
                    key={arr.id.toString()}>
                    <View style={{ display: "flex", width: 100, flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { this.editShop(arr.id) }} style={{ padding: 10, backgroundColor: "orange", borderRadius: 5 }}>
                            <MaterialCommunityIconsIcon name="home-edit" style={{
                                fontSize: 24,
                                color: "#eee"
                            }}></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.deleteShopConfirm(arr.id) }} style={{ padding: 10, backgroundColor: "red", marginLeft: 10, borderRadius: 5 }}>
                            <MaterialCommunityIconsIcon name="delete" style={{
                                fontSize: 24,
                                color: "#eee"
                            }}></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: 90 }}>
                        <Text style={{ color: "#fff", fontSize: 24 }}>{arr.name}</Text>
                    </View>
                </TouchableOpacity>
            );
            this.setState({
                defaultFirstname: userInfo.firstname,
                defaultLastname: userInfo.lastname,
                defaultNumber: userInfo.number,
                stores: arrayStores
            });
        }
    }

    firstnameValidate(str) {
        if (RegExp(/^[a-zA-Zа-яА-Я]+$/ui).test(str)) {
            this.setState({ newFirstname: str })
        } else {
            this.setState({ errorText: "Имя должно состоять из букв" })
        }
    }

    lastnameValidate(str) {
        if (RegExp(/^[a-zA-Zа-яА-Я]+$/ui).test(str)) {
            this.setState({ newLastname: str })
        } else {
            this.setState({ errorText: "Фамилия должно состоять из букв" })
        }
    }

    numberValidate(str) {
        if (RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).test(str)) {
            this.setState({ newNumber: str })
        } else {
            this.setState({ errorText: "Ошибка в формате номера" })
        }
    }

    passwordValidate(str) {
        if (RegExp(/(?=^.{9,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/).test(str)) {
            this.setState({ newPassword: str })
        } else {
            this.setState({ errorText: "Пароль не надежен" })
        }
    }

    async exit() {
        this.props.screenProps.exit();
    }

    render(props) {
        return (
            <View style={styles.container}>
                { (this.state.shop.id ?
                    <Comfirm text={`Вы подтверждаете удаление следующего магазина: ${this.state.shop.name}`}
                        off={() => { this.setState({ shop: "" }) }}
                        confirm={() => { this.deleteShop() }} />
                    : false)
                }
                {(
                    this.state.create ?
                        <FormShopCreate exit={() => { this.setState({ create: false }) }} final={() => { this.componentDidMount(); this.setState({ create: false }) }} />
                        : false
                )}
                {(
                    this.state.edit ?
                        <FormShopUpdate id={this.state.edit} exit={() => { this.setState({ edit: false }) }} final={() => { this.componentDidMount(); this.setState({ edit: false }) }} />
                        : false
                )}
                <View style={{ flex: 1, zIndex: 50 }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#ffffff"
                    />
                    <View style={styles.topBar}>
                        <Text style={styles.settings}>Settings</Text>
                        <TouchableOpacity
                            onPress={() => this.exit()}
                            style={[styles.button, { marginLeft: 190 }]}
                        >
                            <Icon name="log-out" style={styles.icon}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nameGroup}>
                        <Text style={styles.Text}>Имя</Text>
                        <TextInput
                            placeholder="Имя"
                            numberOfLines={1}
                            defaultValue={this.state.defaultFirstname}
                            style={styles.Input}
                            onBlur={(e) => { this.saveSettings() }}
                            onChangeText={(e) => {
                                this.firstnameValidate(e)
                            }}
                        ></TextInput>
                    </View>
                    <View style={styles.lastnameGroup}>
                        <Text style={styles.Text}>Фамилия</Text>
                        <TextInput
                            placeholder="Фамилия"
                            numberOfLines={1}
                            defaultValue={this.state.defaultLastname}
                            style={styles.Input}
                            onBlur={(e) => { this.saveSettings() }}
                            onChangeText={(e) => {
                                this.lastnameValidate(e)
                            }}
                        ></TextInput>
                    </View>
                    <View style={styles.numberGroup}>
                        <Text style={styles.Text}>Телефон</Text>
                        <TextInput
                            placeholder="Телефон"
                            numberOfLines={1}
                            defaultValue={this.state.defaultNumber}
                            style={styles.Input}
                            onBlur={(e) => { this.saveSettings() }}
                            onChangeText={(e) => {
                                this.numberValidate(e)
                            }}
                        ></TextInput>
                    </View>
                    <View style={styles.passwordGroup}>
                        <Text style={styles.Text}>Пароль</Text>
                        <TextInput
                            placeholder="Новый пароль"
                            numberOfLines={1}
                            style={styles.Input}
                            onBlur={(e) => { this.saveSettings() }}
                            onChangeText={(e) => {
                                this.passwordValidate(e)
                            }}
                        ></TextInput>
                    </View>
                    <View style={styles.error}>
                        <Text style={{ textAlign: "center", color: "#fc929e", fontWeight: "700" }}>
                            {this.state.errorText}
                        </Text>
                    </View>
                    <ScrollView horizontal={true} style={{ margin: 10, marginTop: 30 }}>
                        <TouchableOpacity onPress={() => { this.createShop() }} style={[styles.block, {
                            alignItems: "center",
                            justifyContent: "center"
                        }]}>
                            <Text style={{ color: "#fff", fontSize: 24 }}>Создать</Text>
                            <Text style={{ color: "#fff", fontSize: 24 }}>магазин</Text>
                        </TouchableOpacity>
                        {this.state.stores}
                    </ScrollView>
                </View>
                <CupertinoFooter2
                    active="profile"
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
    block: {
        display: "flex",
        width: 165,
        height: 140,
        backgroundColor: "#ff981d",
        borderRadius: 10,
        marginRight: 10
    },
    topBar: {
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 0,
        borderColor: "#E1DFDF",
        borderBottomWidth: 1,
        width: 360,
        height: 47,
        flexDirection: "row"
    },
    cupertinoFooter2: {
        width: 360,
        height: 51,
        backgroundColor: "#f9f9f9",
    },
    Text: {
        fontFamily: "roboto-regular",
        color: "rgba(133,132,132,1)",
        marginTop: -25
    },
    Input: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 40,
        backgroundColor: "#fafbfc",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d3d9de",
        fontSize: 16,
        textAlign: "left",
        marginTop: 8
    },
    nameGroup: {
        width: 303,
        height: 40,
        marginTop: 80,
        marginLeft: 29
    },
    lastnameGroup: {
        width: 303,
        height: 40,
        marginTop: 37,
        marginLeft: 29
    },
    numberGroup: {
        width: 303,
        height: 40,
        marginTop: 37,
        marginLeft: 29
    },
    passwordGroup: {
        width: 303,
        height: 40,
        marginTop: 37,
        marginLeft: 28
    },
    settings: {
        fontFamily: "roboto-700",
        color: "#121212",
        fontSize: 28,
        marginTop: 6,
        marginLeft: 13,
    },
    button: {
        width: 46,
        height: 46,
    },
    error: {
        position: "absolute",
        marginTop: 65,
        textAlign: "center",
        width: 360
    },
    icon: {
        color: "#79b6f2",
        fontSize: 26,
        margin: 10,
    }
});
