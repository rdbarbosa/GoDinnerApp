import React from "react";
import { withRouter } from "react-router";
import { FlatList } from "react-native";
import { fetchRestaurants } from "../graphql/Home";
import {
  Container,
  Content,
  View,
} from "native-base";
import Navigation from "../components/Navigation";
import RestaurantCard from "../components/RestaurantCard";
import CustomHeader from '../components/CustomHeader'
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
<<<<<<< HEAD
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
=======

import { Creators as RestaurantActions } from "../store/ducks/restaurants";
import { Creators as ClientActions } from "../store/ducks/client";
class Home extends React.Component {
  state = {
    restaurants: []
  };
  componentWillMount() {
    const { client, token, updateRestaurants, updateClient } = this.props;
      client.query({
        query: fetchRestaurants
      })
      .then(({data}) => {
        console.log(updateRestaurants)
        this.setState({ restaurants: data.restaurant })
        console.log(data)
          updateRestaurants(data.restaurant)
          // updateClient(data.client)
        })
      .catch(error => console.error(error));
>>>>>>> a00597fe1f1d93436a1a1ec5f9f275d7ec40021a
  }
  render() {
    return (
      <Container>
        <CustomHeader 
          iconLeft={{name:'md-menu'}}
          iconRight={{name: 'location', type: "Entypo"}}
          title={"Pelotas, RS"}
        />
        <Content style={{ backgroundColor: "#f6f6f6", marginTop: 15 }}>
<<<<<<< HEAD
          <FlatList
            style={{ width: "100%" }}
            keyExtractor={(item, index) => item.id.toString()}
            data={this.props.restaurants}
            renderItem={({ item: { id, avatar_url, name }, index }) => (
=======
          <View alignItems={"center"}>
            {[...this.state.restaurants].splice(0,10).map(({ id, name, avatar_url }) => (
>>>>>>> a00597fe1f1d93436a1a1ec5f9f275d7ec40021a
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

<<<<<<< HEAD
const mapStateToProps = ({ token, restaurants }) => ({
  token,
  restaurants
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(RestaurantsActions, dispatch);
=======
const mapStateToProps = state => ({
  token: state.token,
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...RestaurantActions,...ClientActions}, dispatch);
>>>>>>> a00597fe1f1d93436a1a1ec5f9f275d7ec40021a

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Home)));
