import React from "react";
import { Container, Text, Content } from "native-base";
import CustomHeader from "../components/CustomHeader";
import Navigation from "../components/Navigation";
import MapView from "react-native-maps";

class MapRestaurant extends React.Component {
    state = {
        markers: [
            {
                lat: -31.7754348,
                lng: -52.3404474,
                ttl: "Circulus Lanches"
            },
            {
                lat: -31.7752279,
                lng: -52.3405152,
                ttl: "Jão"
            },
            {
                lat: -31.7752375,
                lng: -52.3411891,
                ttl: "Pizzaria Open"
            },
            {
                lat: -31.7742047,
                lng: -52.3426851,
                ttl: "Sanata"
            },
        ]
    }
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
                        initialRegion={{
                            latitude: -31.676155,
                            longitude: -52.337962,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        style={{flex: 1, height: 600}}
                    >
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                coordinate={{latitude: marker.lat, longitude: marker.lng}}
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

export default MapRestaurant;
