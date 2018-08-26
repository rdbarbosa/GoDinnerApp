import React from "react";
import { Text, Container, Header, Content } from "native-base";
import Navigation from "../components/Navigation";

class Perfil extends React.Component {
  render() {
    return (
      <Container>
          <Header></Header>
          <Content>
               <Text>Perfil</Text>
          </Content>
        <Navigation />
      </Container>
    );
  }
}

export default Perfil;
