import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text, TextInput, TouchableOpacity } from "react-native";
import config from "./../config/conf";

export default class ResetPassword extends Component {
  textDefault = 'Введите почту и мы отправим \n\tна нее новый пароль';

  state = {
    text: this.textDefault,
    email: false,
    error: false
  }

  resetPasswordFunction = () => {
    fetch(`${config.host}/api/resetPassword/${this.state.email || "default"}`, {
      method: 'GET'
    }).then((response) => { return response.json() }).then((data) => {
      if (data.response.status == "ok") {
        this.setState({ error: true, text: "Сообщение отправлено\n " });
        setTimeout(()=>{
          this.setState({ error: false, text: this.textDefault });
          this.props.navigation.navigate("Main");
        },1500)
      } else {
        this.setState({ error: true, text: data.response.info+"\n " });
        setTimeout(()=>{
          this.setState({ error: false, text: this.textDefault });
        },1500)
      }
    }).catch(() => {
      this.setState({ error: true, text: "Error connect\n " });
    })
  }

  render(props) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(146,50,62,1)" />
        <View style={styles.topBlock1Stack}>
          <View style={styles.topBlock1}></View>
          <View style={styles.background1}>
            <Text style={[styles.loremIpsum1, { color: (this.state.error ? "red" : "rgba(73,73,73,1)") }]}>{this.state.text}</Text>
            <View style={styles.group1Stack}>
              <View style={styles.group1}>
                <TextInput
                  placeholder="электронная почта"
                  textBreakStrategy="simple"
                  clearButtonMode="never"
                  onChangeText={(e) => {
                    this.setState({ email: e });
                  }}
                  placeholderTextColor="rgba(96,96,97,1)"
                  selectionColor="rgba(216,216,225,1)"
                  style={styles.email1}
                ></TextInput>
              </View>
              <View style={styles.button1}>
                <View style={styles.resetPasswordG}>
                  <TouchableOpacity
                    onPress={() => this.resetPasswordFunction()}
                    style={styles.resetPasswordButton}
                  >
                    <Text style={styles.resetPasswordText}>Сбросить пароль</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.mainPage}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Main")}
                    style={styles.mainPageButton}
                  >
                    <Text style={styles.mainPageText}>Главная страница</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(51,51,51,1)"
  },
  topBlock1: {
    top: 0,
    height: 248,
    position: "absolute",
    backgroundColor: "rgba(242,83,105,1)",
    left: 0,
    right: 0
  },
  background1: {
    top: 90,
    left: 0,
    height: 603,
    position: "absolute",
    backgroundColor: "rgba(232,233,237,1)",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    borderBottomRightRadius: 55,
    borderBottomLeftRadius: 55,
    right: 0
  },
  loremIpsum1: {
    fontFamily: "comic-sans-ms-regular",
    fontSize: 17,
    marginTop: 80,
    textAlign: "center"
  },
  group1: {
    width: 262,
    height: 140,
    position: "absolute",
    justifyContent: "space-between",
    top: 0,
    left: 1
  },
  email1: {
    fontFamily: "roboto-regular",
    color: "rgba(23,22,22,1)",
    height: 43,
    width: 262,
    borderWidth: 0,
    borderColor: "rgba(85,85,85,1)",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: 16,
    marginTop: 34
  },
  button1: {
    top: 135,
    left: 0,
    width: 264,
    height: 123,
    position: "absolute"
  },
  resetPasswordG: {
    width: 264,
    height: 46
  },
  resetPasswordButton: {
    height: 46,
    backgroundColor: "rgba(244,173,36,1)",
    borderRadius: 25,
    shadowColor: "rgba(27,26,26,1)",
    shadowOffset: {
      width: 5,
      height: 5
    },
    elevation: 9,
    shadowOpacity: 0.11,
    shadowRadius: 3
  },
  resetPasswordText: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(233,226,226,1)",
    fontSize: 22,
    textAlign: "center",
    marginTop: 7
  },
  mainPage: {
    width: 264,
    height: 46,
    borderRadius: 2,
    marginTop: 31
  },
  mainPageButton: {
    height: 46,
    borderRadius: 25,
    overflow: "visible",
    shadowColor: "rgba(33,33,33,1)",
    shadowOffset: {
      width: 5,
      height: 5
    },
    elevation: 9,
    shadowOpacity: 0.11,
    shadowRadius: 3,
    backgroundColor: "rgba(231,107,122,1)",
    alignItems: "flex-end"
  },
  mainPageText: {
    fontFamily: "cabin-700",
    color: "rgba(233,226,226,1)",
    fontSize: 22,
    textAlign: "center",
    width: 263,
    height: 30,
    marginTop: 8
  },
  group1Stack: {
    width: 264,
    height: 258,
    marginTop: 49,
    marginLeft: 48
  },
  topBlock1Stack: {
    height: 693
  }
});
