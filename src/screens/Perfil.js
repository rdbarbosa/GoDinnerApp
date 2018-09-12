import React from "react";
import { Text, Container, Header, Content } from "native-base";
import Navigation from "../components/Navigation";
import CustomHeader from "../components/CustomHeader"

class Perfil extends React.Component {
  render() {
    return (
      <Container>
          <CustomHeader 
            iconLeft={{name:'md-menu'}}
            iconRight={{name: 'location', type: "Entypo"}}
            title={"Perfil"}
          />
          <Content>
               <Text>Perfil</Text>
          </Content>
        <Navigation />
      </Container>
    );
  }
}

export default Perfil;
