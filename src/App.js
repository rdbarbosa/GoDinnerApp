import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { ApolloProvider } from "react-apollo";
import {
  Login,
  Home,
  Order,
  Checkin,
  Perfil,
  Register,
  MapRestaurant,
  OrderSuccess,
  Ordered
} from "./screens";
import { NativeRouter, Route, Switch } from "react-router-native";
import { StyleProvider, Root, Drawer, View } from "native-base";
import { Provider } from "react-redux";

import ApolloClient from "apollo-boost";
import getTheme from "../native-base-theme/components";
import godinner from "../native-base-theme/variables/godinner.js";
import store from "./store";
import SideMenu from "./components/SideMenu";
// const urlHml = "https://godinner-backend.herokuapp.com";
const urlHml = "http://10.0.2.2:8000";

const secret = new ApolloClient({
  uri: urlHml + "/graphql/secret",
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: "Bearer " + store.getState().token
      }
    });
  }
});

const client = new ApolloClient({
  uri: urlHml + "/graphql"
});

export default class App extends Component {
  componentDidMount() {
    store.dispatch({
      type: "INIT_MENU",
      drawer: this.drawer
    });
  }
  render() {
    return (
      <Root>
        <Provider store={store}>
          <StyleProvider style={getTheme(godinner)}>
            <NativeRouter>
              <React.Fragment>
                <ApolloProvider client={secret}>
                  <Drawer
                    ref={ref => {
                      this.drawer = ref;
                    }}
                    content={<SideMenu />}
                    onClose={() => {}}
                  >
                    <Switch>
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/orders" component={Order} />
                      <Route exact path="/order" component={Order} />
                      <Route exact path="/checkin" component={Checkin} />
                      <Route exact path="/perfil" component={Perfil} />
                      <Route exact path="/map" component={MapRestaurant} />
                      <Route
                        exact
                        path="/order/success"
                        component={OrderSuccess}
                      />
                      <Route exact path="/order/ordered" component={Ordered} />
                    </Switch>
                  </Drawer>
                </ApolloProvider>
                <ApolloProvider client={client}>
                  <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={Login} />
                    {/* <Route exact path="/" component={Home} /> */}
                  </Switch>
                </ApolloProvider>
              </React.Fragment>
            </NativeRouter>
          </StyleProvider>
        </Provider>
      </Root>
    );
  }
}
