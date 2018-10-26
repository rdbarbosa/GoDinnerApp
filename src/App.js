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
import { StyleProvider, Root } from "native-base";
import { Provider } from "react-redux";

import ApolloClient from "apollo-boost";
import getTheme from "../native-base-theme/components";
import godinner from "../native-base-theme/variables/godinner.js";
import store from "./store";
const urlHml = "https://godinner-backend.herokuapp.com";
// const urlHml = "http://10.0.2.2:8000";

const secret = new ApolloClient({
  uri: urlHml + "/graphql/secret",
  request: async operation => {
    operation.setContext({
      headers: {
        authorization:
          "Bearer " +
          (store.getState().token ||
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVhZTBkOTIwNDYyNDliYTRmZjE2MDg2MWMyODM3ZTBjMTkxNjU4NmY1OWYzOGQxOWVlZTU1YjFkZWFmZjZjNjUzZGEzMTA3YmQ4ZmIxMmIxIn0.eyJhdWQiOiIxIiwianRpIjoiNWFlMGQ5MjA0NjI0OWJhNGZmMTYwODYxYzI4MzdlMGMxOTE2NTg2ZjU5ZjM4ZDE5ZWVlNTViMWRlYWZmNmM2NTNkYTMxMDdiZDhmYjEyYjEiLCJpYXQiOjE1MzU0OTgwOTQsIm5iZiI6MTUzNTQ5ODA5NCwiZXhwIjoxNTY3MDM0MDk0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.QetnW9-LCNVFK_K9oq9Q_jMC622PJCochEu3If6rbHSlbW93cs0RnQcsxCh9nfL3o4ZC-lstY6qIIS_1_NraIz7tLJQt9j6-zA3pn6iWNNZGjyVilIjTaybyBmt8GhX8CKk2jKawC6wu25ohZndHgv8yIyCAR5SCaGWZYHPPHu80YfMftK204o9ne5xALe5iw6ntOn1mCRQ5okLOHXyBtQKPwfbD2BBBmbCAoLjXn0Y486Q5d_06XIiBZOMBFT5jPJaZok3hbK62s9P5YpnFIhnupVIqHZtVvIJTGJq5Zibsc53YQUUKX7g3X7J7Hi-jhic2jCz7vpGuopJjRy8dJ1yXtAcU8STAJtH89g_whcXjcLBCNITaoN883KtC2LJnOFFMqzNXPs523yMThFRdSYK61eWy0czrgXwcKkmJZjdqYm_ot4pov7cZ6c-Qg-Jr9qHc3sZJjxXufs1EhrSTqBeRm69zNAewfMq2p5YdvD_lV9Mq7qHy8jGee0q7hKY7NbMkaF_eAt3BAr1YDb1q3UGgvIHdVUdupW4GfaYcsTUWaiKrdiI3iCRRvY65HvWSQ2tmi6z5loNlhozBcDpb4Ar5FcLVxealHUvQKG5wNIv-Ny6NhF4JtvyeTkV4ntc1262DhknmAvi-0xQubuFA0aRxIWjnn10LPs6x1qkAT30")
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
      <Root>
        <Provider store={store}>
          <StyleProvider style={getTheme(godinner)}>
            <NativeRouter>
              <React.Fragment>
                <ApolloProvider client={secret}>
                  <Switch>
                    <Route exact path="/home" component={Home} />
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
