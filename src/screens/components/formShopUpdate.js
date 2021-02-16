import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Text, Image } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import config from "../../config/conf";
import AsyncStorage from '@react-native-community/async-storage'

export default class FormShop extends Component {
    state = {
        image: "data:image/png;base64,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",
        errorText: "", name: false,
        category: false, information: false,
        defaultData: {}
    }

    async renderError(text) {
        this.setState({ errorText: text });
        setTimeout(() => { this.setState({ errorText: "" }); }, 2500)
    }

    async info() {
        await ImagePicker.launchImageLibrary({ mediaType: "photo" }, (e) => {
            if (e.uri) {
                this.setState({ image: e })
            } else {
                this.renderError("Вы не выбрали фото")
            }
        });
    }

    async createShop() {
        let token = JSON.parse(await AsyncStorage.getItem("token"));
        let double = JSON.parse(await AsyncStorage.getItem("double"));
        let formData = new FormData();
        this.setState({ errorText: "Обработка" });
        formData.append('double', double);
        formData.append('idShop', this.props.id);
        if (this.state.name) {
            formData.append('nameShop', this.state.name);
        }
        if (this.state.information) {
            formData.append('information', this.state.information);
        }
        if (this.state.category) {
            formData.append('category', this.state.category);
        }
        if (this.state.image['uri']) {
            formData.append('image', {
                uri: this.state.image.uri,
                type: 'image/jpeg',
                name: this.state.image.fileName,
                data: this.state.image.data,
            });
        }
        let request = new XMLHttpRequest();
        request.this = this;
        request.onload = async function (e) {
            if (request.status != 200) {
                e.target.this.renderError(request.statusText)
            } else {
                let data = JSON.parse(request.response).response
                if (data.status == "ok") {
                    let user = JSON.parse(await AsyncStorage.getItem("userInfo"));
                    let index = user.stores.findIndex(o => { return o.id === e.target.this.props.id });
                    user.stores[index] = { admin: user.id, id: e.target.this.props.id, name: e.target.this.state.name || e.target.this.state.defaultData['name'] }
                    await AsyncStorage.setItem("userInfo", JSON.stringify(user));
                    e.target.this.props.final()
                } else {
                    e.target.this.renderError(data.info)
                }
            }
        };
        request.onerror = function () {
            this.renderError("Проблемы соединения");
        };
        request.open("PUT", `${config.host}/api/updateShops/${token}`);
        request.send(formData);
    }

    async componentDidMount() {
        this.setState({ errorText: "Загружаю данные" })
        fetch(`${config.host}/api/getShops/${this.props.id}/1`, {
            method: 'GET'
        }).then((response) => { return response.json() }).then(async (data) => {
            if (data.response.status == "ok") {
                this.setState({ errorText: "", defaultData: data.response.data[0], image: `${config.host}/${data.response.data[0]['image']}` })
            } else {
                this.setState({ errorText: data.response.info })
            }
        }).catch((e) => {
            this.setState({ errorText: "Ошибка соединения" })
        })
    }

    name(text) {
        if (text && text.length < 30) {
            this.setState({ name: text })
        } else {
            this.setState({ name: false })
            this.renderError("Заполните поле Название")
        }
    }

    information(text) {
        if (text && text.length < 512) {
            this.setState({ information: text })
        } else {
            this.setState({ information: false })
            this.renderError("Заполните поле Описание")
        }
    }

    category(text) {
        if (text.length && text.split(",").length > 0) {
            this.setState({ category: text })
        } else {
            this.setState({ category: false })
            this.renderError("Перечислите категории через ','")
        }
    }

    render(props) {
        return (
            <View style={styles.container}>
                <View style={styles.block}>
                    <TouchableOpacity
                        onPress={() => { this.props.exit() }}
                        style={[styles.button, { width: 100, backgroundColor: "red" }]}
                    >
                        <Text style={styles.text}>
                            Отмена
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: "red", marginTop: 10, textAlign: "center", fontWeight: "700" }}>{this.state.errorText}</Text>
                    <TextInput
                        placeholder="Название"
                        defaultValue={this.state.defaultData['name']}
                        style={styles.input}
                        onChangeText={(e) => { this.name(e) }}
                    ></TextInput>
                    <TextInput
                        placeholder="Описание"
                        defaultValue={this.state.defaultData['price']}
                        style={styles.input}
                        onChangeText={(e) => { this.information(e) }}
                    ></TextInput>
                    <TextInput
                        placeholder="Категории"
                        defaultValue={this.state.defaultData['info']}
                        style={styles.input}
                        onChangeText={(e) => { this.category(e) }}
                    ></TextInput>
                    <View style={{ justifyContent: "center", alignContent: "center", flexDirection: "row", marginTop: 10 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{
                                uri: this.state.image['uri'] ? this.state.image['uri'] : this.state.image,
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => { this.info() }}
                            style={[styles.button, { backgroundColor: "orange", width: 120, marginLeft: 10, height: 40, marginTop: 30 }]}
                        >
                            <Text style={styles.text}>
                                Фото шапки
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => { this.createShop() }}
                        style={[styles.button, { backgroundColor: "orange" }]}
                    >
                        <Text style={styles.text}>
                            Редактировать магазин
                        </Text>
                    </TouchableOpacity>
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
    input: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 40,
        backgroundColor: "#fafbfc",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d3d9de",
        fontSize: 16,
        textAlign: "left",
        marginTop: 15
    },
    button: {
        left: 0,
        right: 0,
        backgroundColor: "gray",
        padding: 9,
        marginTop: 10,
        borderRadius: 8
    },
    text: {
        fontSize: 16,
        color: "white",
        textAlign: "center"
    }
});