import React, { Component } from "react";
import { Button, Text, Form, Item as FormItem, Input, Icon } from "native-base";
import {
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  BackHandler,
  AsyncStorage
} from "react-native";
import { withRouter } from "react-router-native";
import { withApollo, compose } from "react-apollo";
import { login } from "../graphql/Login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TokenActions } from "../store/ducks/token";
import { Creators as ClientActions } from "../store/ducks/client";

class FormLogin extends Component {
  state = {
    password: "123456",
    email: "admin@godinner.com"
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.props.history.canGo(-1)) {
        this.props.history.goBack();
      } else {
        BackHandler.exitApp();
      }
      return true;
    });
  }
  handleForm = async () => {
    const { client, history, setToken, updateClient } = this.props;
    const { password, email } = this.state;
    try {
      console.log("query");
      const { data } = await client.query({
        query: login,
        variables: { email, password }
      });
      console.log("asyncStorage", data.login);
      setToken(data.login.token);
      updateClient(data.login.client)
      history.push("/home");
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro, tente novamente mais tarde', ToastAndroid.SHORT)
    }
  };

  render() {
    return (
      <React.Fragment>
        <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />
        <ImageBackground
          style={styles.bg}
          imageStyle={{ resizeMode: "stretch" }}
          source={require("../assets/login-bg.jpg")}
        >
          <Image
            style={styles.logo}
            source={require("../assets/godinner-full-white.png")}
          />
          <Form>
            <FormItem rounded style={styles.formItem}>
              <Icon style={styles.iconWhite} type="EvilIcons" name="envelope" />
              <Input
                onChangeText={email => this.setState({ email })}
                style={styles.input}
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholderTextColor="#ffffff"
                placeholder="Email"
                value={this.state.email}

              />
            </FormItem>
            <FormItem rounded style={styles.formItem}>
              <Icon style={styles.iconWhite} type="EvilIcons" name="unlock" />
              <Input
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                textContentType="password"
                placeholderTextColor="#ffffff"
                style={styles.input}
                secureTextEntry={true}
                value={this.state.password}
              />
            </FormItem>

            <Button onPress={this.handleForm} full rounded style={styles.login}>
              <Text style={styles.loginText}>Login</Text>
            </Button>
            <Text
              onPress={() => this.props.history.push("/register")}
              style={styles.haveAccount}
            >
              Não tem conta ainda?
            </Text>
          </Form>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  haveAccount: {
    textAlign: "center",
    color: "white",
    // marginLeft: 20,
    marginTop: 20
  },
  formItem: {
    backgroundColor: "rgba(255,255,255,.3)",
    borderColor: "transparent",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20
  },
  bg: {
    backgroundColor: "#ccc",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  logo: {
    height: 60,
    width: null,
    margin: 15,
    marginTop: 100,
    marginBottom: 100,
    resizeMode: "contain"
  },
  login: { margin: 15, marginTop: 30, backgroundColor: "#2d388a" },
  loginText: { fontSize: 15, letterSpacing: 1.8 },
  input: { color: "#ffffff", letterSpacing: 1.5 },
  iconWhite: { color: "white" },
  label: {}
});

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...TokenActions, ...ClientActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(FormLogin)));
