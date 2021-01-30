import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, StatusBar, TouchableOpacity, Text, TextInput } from "react-native";
import { getDeviceName, getIpAddress } from 'react-native-device-info';
import Icon from "react-native-vector-icons/Entypo";
import config from "./../config/conf";

export default class Login extends Component {
  state = {
    email: false,
    password: false,
    titleError: "",
    errorLogin: false,
    errorPassword: false
  }

  componentDidMount = () => {
    this.props.navigation.dispatch({});
  }

  loginValidate = (l) => {
    this.setState({ email: l });
    if (l.length > 0) {
      if (l.match(/\S+@\S+\.\S+/)) {
        return "ok"
      } else {
        return "false"
      }
    } else {
      return false
    }
  }

  passwordValidate = (p) => {
    this.setState({ password: p });
  }

  Authorization = () => {
    let email = this.state.email;
    let password = this.state.password;
    getDeviceName().then(deviceName => {
      getIpAddress().then(ip => {
        if (password) {
          let body = {
            platforma: "android", password: password,
            ip: ip, device: deviceName, email: email.trim(" ").toLowerCase()
          }
          fetch(`${config.host}/api/emailAuth`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
          }).then((response) => { return response.json() }).then(async (data) => {
            if (data.response.status == "ok") {
              await AsyncStorage.setItem("token", JSON.stringify(data.response.access.tokenAccess));
              await AsyncStorage.setItem("double", JSON.stringify(data.response.access.double));
              var getUserData = () => {
                fetch(`${config.host}/api/getUserData/${data.response.access.tokenAccess}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                }).then((response) => { return response.json() }).then(async (dataLocal) => {
                  if (dataLocal.response.status == "ok") {
                    await AsyncStorage.setItem("userInfo", JSON.stringify(dataLocal.response.data));
                    this.props.screenProps.login(data.response.access.tokenAccess);
                  } else {
                    getUserData();
                  }
                });
              }
              getUserData();
            } else {
              this.setState({ titleError: data.response.info });
            }
          }).catch(() => {
            this.setState({ titleError: "Error connect" });
          })
        } else {
          return "Введите пароль."
        }
      });
    });
  }

  render(props) {
    return (
      <View style={styles.container} >
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(146,116,50,1)"
        />
        <View style={styles.topBlock1Stack}>
          <View style={styles.topBlock1}>
            <View style={styles.back2}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={styles.button4}>
                <Icon name="chevron-left" style={styles.icon1}></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.background1}>
            <Text style={styles.text2}>{this.state.titleError}</Text>
            <Text style={styles.loremIpsum1}>
              Похоже у вас уже есть аккаунт{"\n"}
              {"\t"}введите данные для входа...
            </Text>
            <View style={styles.group1}>
              <View style={styles.group4}>
                <View style={styles.email1Row}>
                  <TextInput
                    placeholder="электронная почта"
                    textBreakStrategy="simple"
                    clearButtonMode="never"
                    dataDetector="phoneNumber"
                    onChangeText={(e) => {
                      this.setState({ errorLogin: this.loginValidate(e) });
                      this.state.titleError ? this.setState({ titleError: "" }) : false;
                    }}
                    placeholderTextColor="rgba(96,96,97,1)"
                    selectionColor="rgba(216,216,225,1)"
                    style={styles.email1}
                  ></TextInput>
                  <View style={styles.loginOkStack}>
                    {
                      this.state.errorLogin ? (this.state.errorLogin == "ok" ?
                        <Icon name="check" style={styles.loginOk}></Icon> :
                        <Icon name="circle-with-cross" style={styles.loginFalse}></Icon>)
                        : false
                    }
                  </View>
                </View>
              </View>
              <View style={styles.group3}>
                <View style={styles.password1Row}>
                  <TextInput
                    placeholder="пароль"
                    textBreakStrategy="simple"
                    clearButtonMode="never"
                    dataDetector="phoneNumber"
                    placeholderTextColor="rgba(96,96,97,1)"
                    selectionColor="rgba(216,216,225,1)"
                    onChangeText={(p) => {
                      this.passwordValidate(p);
                      this.state.titleError ? this.setState({ titleError: "" }) : false;
                    }}
                    secureTextEntry={true}
                    style={styles.password1}
                  ></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.group2}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ResetPassword")}
                style={styles.button3}
              >
                <Text style={styles.resetPassword}>Забыли пароль?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.groupAuth1}>
              <TouchableOpacity
                onPress={() => {
                  let response = this.Authorization();
                  if (response != "ok") {
                    this.setState({ titleError: response });
                  }
                }}
                style={styles.buttonAuth1}
                disabled={this.state.errorLogin == "ok" ? false : true}
              >
                <Text style={styles.authText1}>Авторизация</Text>
              </TouchableOpacity>
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
    backgroundColor: "rgba(242,185,83,1)",
    left: 0,
    right: 0
  },
  back2: {
    width: 45,
    height: 45,
    marginTop: 33,
    marginLeft: 11
  },
  button4: {
    backgroundColor: "rgba(254,105,19,1)",
    borderRadius: 50,
    flex: 1
  },
  icon1: {
    color: "rgba(230,230,230,1)",
    fontSize: 28,
    height: 30,
    width: 28,
    marginTop: 7,
    marginLeft: 9
  }, background1: {
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
  text2: {
    fontFamily: "roboto-regular",
    color: "rgba(242,10,10,1)",
    width: 360,
    textAlign: "center",
    fontSize: 16,
    height: 22,
    marginTop: 46
  },
  loremIpsum1: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(73,73,73,1)",
    fontSize: 17,
    width: 264,
    height: 45,
    textAlign: "center",
    marginTop: 14,
    alignSelf: "center"
  },
  group1: {
    width: 262,
    height: 115,
    justifyContent: "space-between",
    marginTop: 23,
    marginLeft: 49
  },
  group4: {
    width: 262,
    height: 43,
    flexDirection: "row",
    marginTop: 25
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
    fontSize: 16
  },
  loginOk: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(25,231,24,1)",
    fontSize: 20
  },
  loginFalse: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(231,24,24,1)",
    fontSize: 20
  },
  loginOkStack: {
    width: 20,
    height: 22,
    marginLeft: 8,
    marginTop: 21
  },
  email1Row: {
    height: 43,
    flexDirection: "row",
    flex: 1,
    marginRight: -28
  },
  group3: {
    height: 42,
    flexDirection: "row"
  },
  password1: {
    fontFamily: "roboto-regular",
    color: "rgba(23,22,22,1)",
    height: 42,
    width: 262,
    borderWidth: 0,
    borderColor: "rgba(85,85,85,1)",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: 16
  },
  passwordOk: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(25,231,24,1)",
    fontSize: 20
  },
  passwordFalse: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(231,24,24,1)",
    fontSize: 20
  },
  passwordOkStack: {
    width: 20,
    height: 22,
    marginLeft: 8,
    marginTop: 20
  },
  password1Row: {
    height: 42,
    flexDirection: "row",
    flex: 1,
    marginRight: -28
  },
  group2: {
    width: 144,
    height: 29,
    marginTop: 30,
    marginLeft: 72
  },
  button3: {
    width: 144,
    height: 29,
    backgroundColor: "rgba(186,43,233,1)",
    borderRadius: 21
  },
  resetPassword: {
    fontFamily: "roboto-regular",
    color: "rgba(248,244,244,1)",
    marginTop: 6,
    marginLeft: 18
  },
  groupAuth1: {
    width: 264,
    height: 46,
    borderRadius: 2,
    marginTop: 101,
    marginLeft: 48
  },
  buttonAuth1: {
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
  authText1: {
    fontFamily: "cabin-700",
    color: "rgba(233,226,226,1)",
    fontSize: 22,
    textAlign: "center",
    width: 263,
    height: 30,
    marginTop: 8
  },
  topBlock1Stack: {
    height: 710
  }
});