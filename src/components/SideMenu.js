import React, { Component, Fragment } from "react";
import CustomHeader from "./CustomHeader";
import { Drawer, View, Text, Content, Thumbnail, Button } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ImageBackground } from "react-native";
import { Creators as TokenActions } from "../store/ducks/token";
import { Creators as MenuActions } from "../store/ducks/menu";
import { withRouter } from "react-router";

const SideMenu = ({ client, removeToken, history, closeMenu }) => (
  <Content
    style={{ height: "100%", backgroundColor: "#445266" }}
    contentContainerStyle={{ alignItems: "center", flex: 1 }}
  >
    <ImageBackground
      style={{
        width: "100%",
        height: 200,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"
      }}
      imageStyle={{ resizeMode: "cover" }}
      source={require("../assets/bg-perfil.jpg")}

    >
      <Thumbnail
        style={{
          zIndex: 3,
          borderWidth: 2,
          width: 75,
          height: 75,
          borderRadius: 75,
          borderColor: "white"
        }}
        source={{
          uri:
            client.avatar_url === ""
              ? `https://ui-avatars.com/api/?size=128&background=5489FF&color=fff&name=${
                  client.name
                }+${client.lastname}`
              : client.avatar_url
        }}
      />
      <Text style={{ color: "white", marginTop: 15 }}>
        {client.name} {client.lastname}
      </Text>
    </ImageBackground>
    <Button
      transparent
      full
      style={{ marginTop: 20 }}
      onPress={() => {
        history.replace("/home");
        closeMenu();
      }}
    >
      <Text style={{ fontSize: 16, color: "white" }}>Restaurantes</Text>
    </Button>
    <Button
      transparent
      full
      style={{ marginTop: 20 }}
      onPress={() => {
        history.push("/orders");
        closeMenu();
      }}
    >
      <Text style={{ fontSize: 16, color: "white" }}>Pedidos</Text>
    </Button>
    <Button
      full
      style={{ marginTop: "auto", backgroundColor: "#5489FF" }}
      onPress={() => {
        removeToken();
        closeMenu();
        history.replace("/");
      }}
    >
      <Text>Logout</Text>
    </Button>
  </Content>
);
const mapStateToProps = ({ client }) => ({
  client
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...TokenActions, ...MenuActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideMenu));
