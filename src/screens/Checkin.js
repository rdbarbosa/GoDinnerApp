import React from "react";
import { Text, Container, Header, Content } from "native-base";
import Navigation from "../components/Navigation";

class Checkin extends React.Component {
  render() {
    return (
    <Container>
        <Header></Header>
        <Content>
             <Text>Checkin</Text>
        </Content>
      <Navigation />
    </Container>
    );
  }
}

export default Checkin;
