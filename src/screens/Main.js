import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";

export default class Main extends Component {
  componentDidMount = () => {
    this.props.navigation.dispatch({});
  }

  render() {
    return (
      <View style={styles.container} >
        <StatusBar
          animated
          barStyle="light-content"
          backgroundColor="rgba(146,50,62,1)"
        />
        <View style={styles.topBlockStack}>
          <View style={styles.topBlock}></View>
          <View style={styles.background1}>
            <View style={styles.title}>
              <Text style={styles.loremIpsum}>
                Создайте свой магазин {"\n"}уже сегодня!
            </Text>
              <Text style={styles.loremIpsum2}>
                Данное приложение позволяет создать {"\n"} интернет-меню для
              вашего ресторана
            </Text>
            </View>
            <View style={styles.button}>
              <View style={styles.groupReg}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Registration")}
                  style={styles.buttonReg}
                >
                  <Text style={styles.registerText}>Регистрация</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.groupAuth}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Login")}
                  style={styles.buttonAuth}
                >
                  <Text style={styles.authText}>Авторизация</Text>
                </TouchableOpacity>
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
  topBlock: {
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
  title: {
    width: 309,
    height: 133,
    marginTop: 51,
    marginLeft: 30
  },
  loremIpsum: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(94,89,221,1)",
    fontSize: 27,
    textAlign: "center",
    marginLeft: 6
  },
  loremIpsum2: {
    fontFamily: "roboto-italic",
    color: "rgba(73,73,73,1)",
    fontSize: 16,
    opacity: 0.75,
    textAlign: "center",
    marginTop: 10,
    alignSelf: "center"
  },
  button: {
    width: 264,
    height: 123,
    marginTop: 95,
    marginLeft: 53
  },
  groupReg: {
    width: 264,
    height: 46
  },
  buttonReg: {
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
  registerText: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(233,226,226,1)",
    fontSize: 22,
    textAlign: "center",
    marginTop: 7
  },
  groupAuth: {
    width: 264,
    height: 46,
    borderRadius: 2,
    marginTop: 31
  },
  buttonAuth: {
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
  authText: {
    fontFamily: "cabin-700",
    color: "rgba(233,226,226,1)",
    fontSize: 22,
    textAlign: "center",
    width: 263,
    height: 30,
    marginTop: 8
  },
  topBlockStack: {
    height: 693
  }
});
