import React from "react";
import { withRouter } from "react-router";
import { FlatList } from "react-native";
import { fetchRestaurants } from "../graphql/Home";
import { Container, Content, View } from "native-base";
import Navigation from "../components/Navigation";
import RestaurantCard from "../components/RestaurantCard";
import CustomHeader from "../components/CustomHeader";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomToast from '../components/CustomToast'
import { Creators as RestaurantActions } from "../store/ducks/restaurants";
import { Creators as ClientActions } from "../store/ducks/client";
class Home extends React.Component {
  state = {
    restaurants: []
  };
  componentWillMount() {
    const { client, token, updateRestaurants, updateClient } = this.props;
    client
      .query({
        query: fetchRestaurants
      })
      .then(({ data }) => {
        console.log(updateRestaurants);
        this.setState({ restaurants: data.restaurant });
        console.log(data);
        updateRestaurants(data.restaurant);
        // updateClient(data.client)
      })
      .catch(error => console.error(error));
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
