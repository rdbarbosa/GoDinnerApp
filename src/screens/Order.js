import React from "react";
import { Text, Container, Header, Content } from "native-base";
import Navigation from "../components/Navigation";

class Order extends React.Component {
  render() {
    return (
        <Container>
        <Header></Header>
        <Content>
             <Text>Order</Text>
        </Content>
      <Navigation />
    </Container>
      );
  }
}

export default Order;
