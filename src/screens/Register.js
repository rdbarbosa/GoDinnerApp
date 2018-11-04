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
import { register } from "../graphql/Register";
import CustomToast from "../components/CustomToast";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TokenActions } from "../store/ducks/token";
import { Mutation } from "react-apollo";

class Register extends Component {
  state = {
    name: "",
    lastname: "",
    phoneNumber: "",
    password: "",
    email: ""
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
  async handleForm(register, data) {
    const { history, setToken } = this.props;
    const { password, email, name, lastname, phoneNumber } = this.state;
    try {
      await register({
        variables: {
          email,
          password,
          name,
          lastname,
          phone_number: phoneNumber
        }
      });
      CustomToast({ text: "Cadastrado com sucesso!", type: "success" });
    } catch (error) {
      CustomToast({
        text: "Ocorreu um erro, verifique os campos e tente novamente",
        type: "danger",
      });
    }
  }

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
              <Icon style={styles.iconWhite} type="EvilIcons" name="user" />
              <Input
                onChangeText={name => this.setState({ name })}
                style={styles.input}
                placeholderTextColor="#ffffff"
                placeholder="Nome"
              />
            </FormItem>
            <FormItem rounded style={styles.formItem}>
              <Icon style={styles.iconWhite} type="EvilIcons" name="user" />
              <Input
                onChangeText={lastname => this.setState({ lastname })}
                style={styles.input}
                placeholderTextColor="#ffffff"
                placeholder="Sobrenome"
              />
            </FormItem>
            <FormItem rounded style={styles.formItem}>
              <Icon
                style={styles.iconWhite}
                type="MaterialCommunityIcons"
                name="cellphone-android"
              />
              <Input
                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                style={styles.input}
                placeholderTextColor="#ffffff"
                placeholder="Celular"
              />
            </FormItem>
            <FormItem rounded style={styles.formItem}>
              <Icon style={styles.iconWhite} type="EvilIcons" name="envelope" />
              <Input
                onChangeText={email => this.setState({ email })}
                style={styles.input}
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholderTextColor="#ffffff"
                placeholder="E-mail"
              />
            </FormItem>
            <FormItem rounded style={styles.formItem}>
              <Icon style={styles.iconWhite} type="EvilIcons" name="unlock" />
              <Input
                onChangeText={password => this.setState({ password })}
                placeholder="Senha"
                textContentType="password"
                placeholderTextColor="#ffffff"
                style={styles.input}
                secureTextEntry={true}
              />
            </FormItem>
            <Mutation mutation={register}>
              {(register, { data }) => (
                <Button
                  onPress={() => this.handleForm(register, data)}
                  full
                  rounded
                  style={styles.login}
                >
                  <Text style={styles.loginText}>Cadastrar</Text>
                </Button>
              )}
            </Mutation>
            <Text
              onPress={() => this.props.history.goBack()}
              style={styles.haveAccount}
            >
              Já tem conta?
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
    marginTop: 50,
    marginBottom: 50,
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
  bindActionCreators(TokenActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Register)));
