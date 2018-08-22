import React, { Component } from "react";
import { Button, Text, Form, Item as FormItem, Input, Icon } from "native-base";
import { ImageBackground, Image, StatusBar, StyleSheet } from "react-native";
import { withRouter } from "react-router";

class FormLogin extends Component {

  

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
              <Icon
                style={{ color: "white" }}
                type="EvilIcons"
                name="envelope"
              />
              <Input
                style={styles.input}
                placeholderTextColor="#ffffff"
                placeholder="Email"
              />
            </FormItem>
            <FormItem rounded style={styles.formItem}>
              <Icon style={{ color: "white" }} type="EvilIcons" name="unlock" />
              <Input
                placeholder="Password"
                placeholderTextColor="#ffffff"
                style={styles.input}
                secureTextEntry={true}
              />
            </FormItem>

            <Button
              onPress={() => this.handleForm()}
              full
              rounded
              style={styles.login}
            >
              <Text style={styles.loginText}>Login</Text>
            </Button>
          </Form>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#ccc",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  formItem: {
    backgroundColor: "rgba(255,255,255,.3)",
    borderColor: "transparent",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20
  },
  label: {},
  input: {
    color: "#ffffff",
    letterSpacing: 1.5
  },
  loginText: {
    fontSize: 15,
    letterSpacing: 1.8
  },
  login: {
    margin: 15,
    marginTop: 30,
    backgroundColor: "#2d388a"
  },
  logo: {
    height: 60,
    width: null,
    margin: 15,
    marginTop: 100,
    marginBottom: 100,
    resizeMode: "contain"
  }
});

export default withRouter(FormLogin);
