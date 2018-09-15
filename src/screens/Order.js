import React from "react";
import { Text, Container, Header, Content, Left, Button, Body, Title, Icon, Right } from "native-base";
import Navigation from "../components/Navigation";
import CustomHeader from "../components/CustomHeader"

class Order extends React.Component {
  render() {
    return (
        <Container>
          <CustomHeader 
            iconLeft={{name:'md-menu'}}
            iconRight={{name: 'location', type: "Entypo"}}
            title={"Pedidos"}
          />
          <Content>
              <Text>Order</Text>
          </Content>
          <Navigation />
        </Container>
      );
  }
}

export default Order;
