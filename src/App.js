import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Login from './screens/Login'
import Home from './screens/Home'
import { NativeRouter, Route, Switch } from 'react-router-native'
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
      <NativeRouter>
        <React.Fragment>
          <ApolloProvider client={secret}>
              <Switch>
                <Route path="/client"/>
                <Route exact path="/home" component={Home}/>
  
              </Switch>
          </ApolloProvider>
          <ApolloProvider client={client}>
              <Switch>
                <Route exact path="/" component={Login}/>
              </Switch>
          </ApolloProvider>
        </React.Fragment>
      </NativeRouter>
    );
  }
}