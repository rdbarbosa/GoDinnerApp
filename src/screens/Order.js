import React from "react";
import { Text, Container, Header, Content, Left, Button, Body, Title, Icon, Right } from "native-base";
import Navigation from "../components/Navigation";

class Order extends React.Component {
  render() {
    return (
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name="md-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Pedidos</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="location" type="Entypo" />
              </Button>
            </Right>
          </Header>
          <Content>
              <Text>Order</Text>
          </Content>
          <Navigation />
        </Container>
      );
  }
}

export default Order;
