import React from "react";
import { withRouter } from "react-router";
import { FlatList } from "react-native";
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
import { Creators as RestaurantsActions } from "../store/ducks/restaurants";
class Home extends React.Component {
  async componentWillMount() {
    const { client, restaurants, updateRestaurants } = this.props;
    console.log(restaurants);
    try {
      const { data } = await client.query({ query: fetchRestaurants });
      updateRestaurants(data.restaurant);
    } catch (error) {
      console.warn(error);
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
          <FlatList
            style={{ width: "100%" }}
            keyExtractor={(item, index) => item.id.toString()}
            data={this.props.restaurants}
            renderItem={({ item: { id, avatar_url, name }, index }) => (
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
            )}
          />
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = ({ token, restaurants }) => ({
  token,
  restaurants
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(RestaurantsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Home)));
