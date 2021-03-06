import React from "react";
import { withRouter } from "react-router";
import { FlatList, Animated, TouchableOpacity } from "react-native";
import { fetchRestaurants } from "../graphql/Home";
import { Container, Content, View } from "native-base";
import Navigation from "../components/Navigation";
import RestaurantCard from "../components/RestaurantCard";
import CustomHeader from "../components/CustomHeader";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as RestaurantActions } from "../store/ducks/restaurants";
import { Creators as ClientActions } from "../store/ducks/client";
import { SimpleAnimation } from "react-native-simple-animations";
class Home extends React.Component {
  componentWillMount() {
    const { client, updateRestaurants } = this.props;
    client
      .query({
        query: fetchRestaurants,
        fetchPolicy: "network-only",

      })
      .then(({ data }) => {
        updateRestaurants(data.restaurant);
      })
      .catch(error => console.error(error));
  }

  animateAndPush(item) {
    this.props.history.push("/restaurant/" + item.id, { restaurant: item });
  }
  render() {
    return (
      <Container>
        <CustomHeader
          iconLeft={{ name: "md-menu" }}
          iconRight={{ name: "location", type: "Entypo" }}
          title={"Pelotas, RS"}
        />
        <Content style={{ backgroundColor: "#f6f6f6", marginTop: 15 }}>
          <FlatList
            style={{ width: "100%" }}
            keyExtractor={item => item.id.toString()}
            data={this.props.restaurants}
            renderItem={({ item, index }) => (
              <SimpleAnimation
                duration={1000}
                movementType="slide"
                direction="left"
                distance={(index + 1) * 200}
                useNativeDriver={true}
              >
                <TouchableOpacity onPress={() => this.animateAndPush(item)}>
                  <RestaurantCard
                    key={item.id}
                    thumb={{ uri: item.avatar_url }}
                    name={item.name}
                    desc="Lancheria"
                    time={{
                      open: "18:00",
                      close: "00:00"
                    }}
                    avaliation={3}
                  />
                </TouchableOpacity>
              </SimpleAnimation>
            )}
          />
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...RestaurantActions, ...ClientActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Home)));
