import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-community/async-storage'

import Main from "./src/screens/Main";
import Login from "./src/screens/Login";
import Loading from "./src/screens/Loading";
import Registration from "./src/screens/Registration";
import ResetPassword from "./src/screens/ResetPassword";
import Search from "./src/screens/Search";
import Saves from "./src/screens/Saves";
import Shop from "./src/screens/Shop";
import Product from "./src/screens/Product";
import Profile from "./src/screens/Profile";
import Messages from "./src/screens/Messages";

export default class App extends Component {
  state = {
    isToken: null,
    loading: true
  }

  async componentDidMount() {
    let token = JSON.parse(await AsyncStorage.getItem("token"));
    if (token) {
      fetch(`${config.host}/api/getUserData/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then((response) => { return response.json() }).then(async (data) => {
        if (data.response.status == "ok") {
          AsyncStorage.setItem("userInfo", JSON.stringify(data.response.data));
          this.setState({ isToken: token });
        } else {
          this.setState({ isToken: false });
        }
      });
      new Promise((resolve, reject) => setTimeout(() => {
        this.setState({ loading: false }); resolve();
      }, 2500))
      this.setState({ loading: false });
    } else {
      this.setState({ isToken: false, loading: false });
    }

  }

  login(str) {
    this.setState({ isToken: str });
  }

  async exit() {
    this.setState({ isToken: false });
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("double");
      await AsyncStorage.removeItem("userInfo");
    } catch (e) { }
  }

  render() {
    changeNavigationBarColor('#000000');
    if (this.state.isToken == null || this.state.loading) {
      return <Loading />;
    } else {

      let StackNavigation = createStackNavigator(
        this.state.isToken == false ? ({
          Main,
          Login,
          Registration,
          ResetPassword
        }) : ({
          Search,
          Saves,
          Profile,
          Messages,
          Shop,
          Product
        }), {
        headerMode: 'none',
        defaultNavigationOptions: {
          ...TransitionPresets.ScaleFromCenterAndroid,
        },
      });

      let props = {
        login: (str) => this.login(str),
        exit: () => this.exit()
      };

      const AppContainer = createAppContainer(StackNavigation);

      return <AppContainer screenProps={props} />;
    }
  }
}