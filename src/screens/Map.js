import React from "react";

import { Container, Text, Content } from "native-base";
import CustomHeader from "../components/CustomHeader";
import Navigation from "../components/Navigation";
import MapView from "react-native-maps";
import { connect } from "react-redux";

class MapRestaurant extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.setState({
      markers: this.props.restaurants.map(restaurant => ({
        lat: +Number(restaurant.latitude).toFixed(7),
        lng: +Number(restaurant.longitude).toFixed(7),
        ttl: restaurant.name 
      }))
    });

    navigator.geolocation.getCurrentPosition(geo => {
      console.log(geo)
      this.setState({initialRegion: {
        latitude: geo.coords.latitude,
        longitude: geo.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }})
    }, error => console.log(error), {enableHighAccuracy: true})
  }
  state = {
    markers: [],
    initialRegion: {
      latitude: -31.770046,
      longitude: -52.340527,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };
  render() {
    return (
      <Container>
        <CustomHeader
          iconLeft={{ name: "md-menu" }}
          iconRight={{ name: "location", type: "Entypo" }}
          title={"Mapa"}
        />
        <Content>
          <MapView
            initialRegion={this.state.initialRegion}
            style={{ flex: 1, height: 600 }}
          >
            {this.state.markers.map((marker, index) => (
              <MapView.Marker
                key={index}
                coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                title={marker.ttl}
              />
            ))}
          </MapView>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ ...RestaurantActions }, dispatch);

export default connect(
  mapStateToProps,
  {}
  //   mapDispatchToProps
)(MapRestaurant);
