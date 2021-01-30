import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, StatusBar, TouchableOpacity, Text, TextInput } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";

export default class Registration extends Component {
  state = {
    titleError: "",
    firstname: false,
    firstnameStatus: false,
    lastname: false,
    lastnameStatus: false,
    password: false,
    passwordStatus: false,
    number: false,
    numberStatus: false,
    email: false,
    emailStatus: false
  }

  clearTitileError = () => {
    new Promise((resolve, reject) => {
      setTimeout(() => { this.setState({ titleError: "" }); resolve(); }, 2500)
    });
  }

  firstnameValidator = (str) => {
    if (str.length > 0) {
      if (str.length <= 20) {
        this.setState({ firstname: true })
        if (RegExp(/^[а-яА-ЯёЁa-zA-Z]+$/).test(str)) {
          this.setState({ firstnameStatus: true, firstname: str });
        } else {
          this.setState({ firstnameStatus: false, titleError: "Имя должно состоять из букв" });
          this.clearTitileError();
        }
      } else {
        this.setState({ firstnameStatus: false, titleError: "Имя слишком длинное" });
        this.clearTitileError();
      }
    } else {
      this.setState({ firstname: false });
    }
  }

  lastnameValidator = (str) => {
    if (str.length > 0) {
      if (str.length <= 20) {
        this.setState({ lastname: true })
        if (RegExp(/^[а-яА-ЯёЁa-zA-Z]+$/).test(str)) {
          this.setState({ lastnameStatus: true, lastname: str });
        } else {
          this.setState({ lastnameStatus: false, titleError: "Фамилия должна состоять из букв" });
          this.clearTitileError();
        }
      } else {
        this.setState({ lastnameStatus: false, titleError: "Фамилия слишком длинная" });
        this.clearTitileError();
      }
    } else {
      this.setState({ lastname: false });
    }
  }

  passwordValidator = (str) => {
    if (str.length > 0) {
      this.setState({ password: true })
      if (RegExp(/(?=^.{9,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/).test(str)) {
        this.setState({ passwordStatus: true, password: str.replace(' ', '') });
      } else {
        this.setState({ passwordStatus: false, titleError: "Пароль 8 символов, регистр, спец. сим." });
        this.clearTitileError();
      }
    } else {
      this.setState({ password: false });
    }
  }

  numberValidator = (str) => {
    if (str.length > 0) {
      this.setState({ number: true })
      if (RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).test(str)) {
        this.setState({ numberStatus: true, number: str });
      } else {
        this.setState({ numberStatus: false, titleError: "Неправильный формат номера" });
        this.clearTitileError();
      }
    } else {
      this.setState({ number: false });
    }
  }

  emailValidator = (str) => {
    if (str.length > 0) {
      this.setState({ email: true })
      if (RegExp(/^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/).test(str)) {
        fetch(`${config.host}/api/emailStatus/${str}`, {
          method: 'GET'
        }).then((response) => { return response.json() }).then((data) => {
          if (data.response.status == "ok") {
            this.setState({ emailStatus: true, email: str });
          } else {
            this.setState({ emailStatus: false, titleError: data.response.info });
            this.clearTitileError();
          }
        }).catch(() => {
          this.setState({ titleError: "Error connect" });
          this.clearTitileError();
        })
      } else {
        this.setState({ emailStatus: false, titleError: "Неправильный формат E-mail" });
        this.clearTitileError();
      }
    } else {
      this.setState({ email: false });
    }
  }

  registration = () => {
    let fnameStatus = this.state.firstnameStatus;
    let lnameStatus = this.state.lastnameStatus;
    let passwordStatus = this.state.passwordStatus;
    let numberStatus = this.state.numberStatus;
    let emailStatus = this.state.emailStatus;
    if (fnameStatus && lnameStatus && passwordStatus && numberStatus && emailStatus) {
      fetch(`${config.host}/api/createAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "number": this.state.number,
          "password": this.state.password,
          "firstname": this.state.firstname,
          "email": this.state.email.toLowerCase(),
          "lastname": this.state.lastname,
        })
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
          this.clearTitileError();
        }
      }).catch(() => {
        this.setState({ titleError: "Error connect" });
        this.clearTitileError();
      })
    } else {
      this.setState({ titleError: "Исправьте ошибки" });
      this.clearTitileError();
    }
  }

  render(props) {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          barStyle="light-content"
          backgroundColor="rgba(146,116,50,1)"
        />
        <View style={styles.topBlock1Stack}>
          <View style={styles.topBlock1}>
            <View style={styles.back}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Main")}
                style={styles.button2}
              >
                <EntypoIcon name="chevron-left" style={styles.icon}></EntypoIcon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.background1}>
            <Text style={styles.text1}>{this.state.titleError}</Text>
            <Text style={styles.title}>Для регистрации заполните {"\n"}поля</Text>
            <View style={styles.input}>
              <View style={styles.group}>
                <View style={styles.firstNameFalseStack}>
                  {this.state.firstname ? (
                    (this.state.firstnameStatus ?
                      (<EntypoIcon name="check" style={styles.lastNameOk}></EntypoIcon>) :
                      (<EntypoIcon name="circle-with-cross" style={styles.lastNameFalse}></EntypoIcon>))
                  ) : false}
                </View>
                <TextInput
                  placeholder="имя"
                  textBreakStrategy="simple"
                  clearButtonMode="never"
                  onChangeText={(s) => {
                    this.firstnameValidator(s);
                  }}
                  placeholderTextColor="rgba(96,96,97,1)"
                  selectionColor="rgba(216,216,225,1)"
                  style={styles.firstname}
                ></TextInput>
              </View>
              <View style={styles.group2}>
                <View style={styles.lastNameFalseStack}>
                  {this.state.lastname ? (
                    (this.state.lastnameStatus ?
                      (<EntypoIcon name="check" style={styles.lastNameOk}></EntypoIcon>) :
                      (<EntypoIcon name="circle-with-cross" style={styles.lastNameFalse}></EntypoIcon>))
                  ) : false}
                </View>
                <TextInput
                  placeholder="фамилия"
                  textBreakStrategy="simple"
                  clearButtonMode="never"
                  onChangeText={(s) => {
                    this.lastnameValidator(s);
                  }}
                  placeholderTextColor="rgba(96,96,97,1)"
                  selectionColor="rgba(216,216,225,1)"
                  style={styles.lastname}
                ></TextInput>
              </View>
              <View style={styles.group3}>
                <View style={styles.numberFalseStack}>
                  {this.state.number ? (
                    (this.state.numberStatus ?
                      (<EntypoIcon name="check" style={styles.lastNameOk}></EntypoIcon>) :
                      (<EntypoIcon name="circle-with-cross" style={styles.lastNameFalse}></EntypoIcon>))
                  ) : false}
                </View>
                <TextInput
                  placeholder="номер телефона"
                  textBreakStrategy="simple"
                  clearButtonMode="never"
                  onChangeText={(s) => {
                    this.numberValidator(s);
                  }}
                  placeholderTextColor="rgba(96,96,97,1)"
                  selectionColor="rgba(216,216,225,1)"
                  style={styles.number}
                ></TextInput>
              </View>
              <View style={styles.group4}>
                <View style={styles.emailFalseStack}>
                  {this.state.email ? (
                    (this.state.emailStatus ?
                      (<EntypoIcon name="check" style={styles.lastNameOk}></EntypoIcon>) :
                      (<EntypoIcon name="circle-with-cross" style={styles.lastNameFalse}></EntypoIcon>))
                  ) : false}
                </View>
                <TextInput
                  placeholder="электронная почта"
                  textBreakStrategy="simple"
                  clearButtonMode="never"
                  onChangeText={(s) => {
                    this.emailValidator(s);
                  }}
                  placeholderTextColor="rgba(96,96,97,1)"
                  selectionColor="rgba(216,216,225,1)"
                  style={styles.email}
                ></TextInput>
              </View>
              <View style={styles.group5}>
                <View style={styles.passwordFalseStack}>
                  {this.state.password ? (
                    (this.state.passwordStatus ?
                      (<EntypoIcon name="check" style={styles.lastNameOk}></EntypoIcon>) :
                      (<EntypoIcon name="circle-with-cross" style={styles.lastNameFalse}></EntypoIcon>))
                  ) : false}
                </View>
                <TextInput
                  placeholder="пароль"
                  textBreakStrategy="simple"
                  clearButtonMode="never"
                  onChangeText={(s) => {
                    this.passwordValidator(s);
                  }}
                  placeholderTextColor="rgba(96,96,97,1)"
                  selectionColor="rgba(216,216,225,1)"
                  secureTextEntry={true}
                  style={styles.password}
                ></TextInput>
              </View>
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                onPress={() => this.registration()}
                style={styles.button1}
              >
                <Text style={styles.registrButtonText}>Регистрация</Text>
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
  back: {
    width: 45,
    height: 45,
    marginTop: 33,
    marginLeft: 11
  },
  button2: {
    backgroundColor: "rgba(254,105,19,1)",
    borderRadius: 50,
    flex: 1
  },
  icon: {
    color: "rgba(230,230,230,1)",
    fontSize: 28,
    height: 30,
    width: 28,
    marginTop: 7,
    marginLeft: 9
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
  text1: {
    fontFamily: "roboto-regular",
    color: "rgba(242,10,10,1)",
    width: 360,
    textAlign: "center",
    fontSize: 16,
    height: 22,
    marginTop: 45
  },
  title: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(73,73,73,1)",
    fontSize: 17,
    textAlign: "center",
    lineHeight: 25,
    marginTop: 11
  },
  input: {
    width: 262,
    height: 251,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0)",
    marginTop: 16,
    marginLeft: 49
  },
  group: {
    width: 262,
    height: 45,
    flexDirection: "row",
    marginTop: -10
  },
  firstNameFalse: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(231,24,24,1)",
    fontSize: 20
  },
  firstNameOk: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(25,231,24,1)",
    fontSize: 20
  },
  firstNameFalseStack: {
    width: 20,
    height: 22,
    marginLeft: 262,
    marginTop: 12
  },
  firstname: {
    fontFamily: "roboto-regular",
    color: "rgba(157,157,157,1)",
    borderWidth: 0,
    borderColor: "rgba(85,85,85,1)",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: 16,
    flex: 1,
    marginLeft: -282
  },
  group2: {
    width: 262,
    height: 47,
    flexDirection: "row"
  },
  lastNameFalse: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(231,24,24,1)",
    fontSize: 20
  },
  lastNameOk: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(25,231,24,1)",
    fontSize: 20
  },
  lastNameFalseStack: {
    width: 20,
    height: 22,
    marginLeft: 262,
    marginTop: 13
  },
  lastname: {
    fontFamily: "roboto-regular",
    color: "rgba(157,157,157,1)",
    borderWidth: 0,
    borderColor: "rgba(85,85,85,1)",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: 16,
    flex: 1,
    marginLeft: -282
  },
  group3: {
    width: 262,
    height: 43,
    flexDirection: "row"
  },
  numberFalse: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(231,24,24,1)",
    fontSize: 20
  },
  numberOk: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(25,231,24,1)",
    fontSize: 20
  },
  numberFalseStack: {
    width: 20,
    height: 22,
    marginLeft: 262,
    marginTop: 11
  },
  number: {
    fontFamily: "roboto-regular",
    color: "rgba(157,157,157,1)",
    borderWidth: 0,
    borderColor: "rgba(85,85,85,1)",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: 16,
    flex: 1,
    marginLeft: -282
  },
  group4: {
    width: 262,
    height: 44,
    flexDirection: "row"
  },
  emailFalse: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(231,24,24,1)",
    fontSize: 20
  },
  emailOk: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(25,231,24,1)",
    fontSize: 20
  },
  emailFalseStack: {
    width: 20,
    height: 22,
    marginLeft: 262,
    marginTop: 11
  },
  email: {
    fontFamily: "roboto-regular",
    color: "rgba(157,157,157,1)",
    borderWidth: 0,
    borderColor: "rgba(85,85,85,1)",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: 16,
    flex: 1,
    marginLeft: -282
  },
  group5: {
    width: 262,
    height: 44,
    flexDirection: "row",
    marginLeft: 1
  },
  passwordFalse: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(231,24,24,1)",
    fontSize: 20
  },
  passwordOk: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(25,231,24,1)",
    fontSize: 20
  },
  passwordFalseStack: {
    width: 20,
    height: 22,
    marginLeft: 262,
    marginTop: 11
  },
  password: {
    fontFamily: "roboto-regular",
    color: "rgba(157,157,157,1)",
    borderWidth: 0,
    borderColor: "rgba(85,85,85,1)",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: 16,
    flex: 1,
    marginLeft: -282
  },
  buttonBox: {
    width: 263,
    height: 46,
    backgroundColor: "rgba(15,15, 15,0)",
    marginTop: 29,
    marginLeft: 49
  },
  button1: {
    width: 263,
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
  registrButtonText: {
    fontFamily: "cabin-700",
    color: "rgba(233,226,226,1)",
    fontSize: 22,
    textAlign: "center",
    flex: 1,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 65,
    marginRight: 65
  },
  topBlock1Stack: {
    height: 693
  }
});
