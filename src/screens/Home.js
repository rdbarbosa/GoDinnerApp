import React from "react";
import { withRouter } from "react-router";
import { AsyncStorage } from "react-native";
import { fetchRestaurants } from "../graphql/Home";
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
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TokenActions } from "../store/ducks/token";
class Home extends React.Component {
  state = {
    restaurants: []
  };
  async componentWillMount() {
    const { client, token } = this.props;
    try {
      const { data } = await client.query({
        query: fetchRestaurants
      });
      this.setState({ restaurants: data.restaurant });
    } catch (error) {
      console.dir(error);
    }
  }
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
            {this.state.restaurants.map(({ id, name, avatar_url }) => (
              <RestaurantCard
                key={id}
                thumb={{ uri: avatar_url }}
                name={name}
                desc="Lancheria"
                time={{
                  open: "18:00",
                  close: "00:00"
                }}
                avaliation={3}
              />
            ))}
          </View>
        </Content> 
        <Navigation />
      </Container> 
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TokenActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Home)));
