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
import CustomHeader from '../components/CustomHeader'
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TokenActions } from "../store/ducks/token";
class Home extends React.Component {
  state = {
    restaurants: []
  };
  componentWillMount() {
    const { client, token } = this.props;
      client.query({
        query: fetchRestaurants
      })
      .then(({data}) => this.setState({ restaurants: data.restaurant }))
      .catch(error => console.error(error));
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
          <View alignItems={"center"}>
            {[...this.state.restaurants].splice(0,10).map(({ id, name, avatar_url }) => (
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
