import React from "react";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { withRouter } from "react-router-native";
const Navigation = ({ history, location }) => (
  <Footer style={{ marginBottom: -3, padding: 0 }}>
    <FooterTab>
      <Button
        vertical
        onPress={() => history.push("/home")}
        active={location.pathname == "/home"}
      >
        <Icon type="MaterialIcons" name="restaurant-menu" />
        <Text style={{paddingLeft: 0, paddingRight: 0}}>Restaurantes</Text>
      </Button>
      <Button
        vertical
        onPress={() => history.push("/order")}
        active={location.pathname == "/order"}
      >
        <Icon active name="cart" />
        <Text>Pedido</Text>
      </Button>
      <Button
        vertical
        onPress={() => history.push("/checkin")}
        active={location.pathname == "/checkin"}
      >
        <Icon name="camera" />
        <Text>Check-in</Text>
      </Button>
      <Button
        vertical
        onPress={() => history.push("/perfil")}
        active={location.pathname == "/perfil"}
      >
        <Icon name="person" />
        <Text>Perfil</Text>
      </Button>
    </FooterTab>
  </Footer>
);

export default withRouter(Navigation);
