import React from "react";
import { withRouter } from "react-router";
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Container,
  Content,
  View,
  StyleProvider
} from "native-base";
import Navigation from "../components/Navigation";
import RestaurantCard from "../components/RestaurantCard";

class Home extends React.Component {
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
            <Title>Pelotas, RS</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="location" type="Entypo" />
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "#f6f6f6", marginTop: 15 }}>
          <View alignItems={"center"}>
            <RestaurantCard
              thumb={require("../assets/logo-circulus.png")}
              name="Circulus Lanches"
              desc="Lancheria"
              time={{
                open: "18:00",
                close: "00:00"
              }}
              avaliation={3}
            />
            <RestaurantCard
              thumb={require("../assets/logo-circulus.png")}
              name="Circulus Lanches"
              desc="Lancheria"
              time={{
                open: "18:00",
                close: "00:00"
              }}
              avaliation={5}
            />
            <RestaurantCard
              thumb={require("../assets/logo-circulus.png")}
              name="Circulus Lanches"
              desc="Lancheria"
              time={{
                open: "18:00",
                close: "00:00"
              }}
              avaliation={2}
            />
            <RestaurantCard
              thumb={require("../assets/logo-circulus.png")}
              name="Circulus Lanches"
              desc="Lancheria"
              time={{
                open: "18:00",
                close: "00:00"
              }}
              avaliation={4}
            />
          </View>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

export default withRouter(Home);
