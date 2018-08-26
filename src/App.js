import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { NativeRouter, Route, Switch } from "react-router-native";
import getTheme from "../native-base-theme/components";
import godinner from "../native-base-theme/variables/godinner.js";
import Order from "./screens/Order";
import Checkin from "./screens/Checkin";
import Perfil from "./screens/Perfil";
import { StyleProvider } from "native-base";
const urlHml = "https://godinner-backend.herokuapp.com";

const secret = new ApolloClient({
  uri: urlHml + "/graphql/secret",
  request: async operation => {
    const token = await AsyncStorage.getItem("token");
    // console.log(operation);
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

const client = new ApolloClient({
  uri: urlHml + "/graphql"
});

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(godinner)}>
        <NativeRouter>
          <React.Fragment>
            <ApolloProvider client={secret}>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/order" component={Order} />
                <Route exact path="/checkin" component={Checkin} />
                <Route exact path="/perfil" component={Perfil} />
              </Switch>
            </ApolloProvider>
            <ApolloProvider client={client}>
              <Switch>
                <Route exact path="/" component={Login} />
              </Switch>
            </ApolloProvider>
          </React.Fragment>
        </NativeRouter>
      </StyleProvider>
    );
  }
}
