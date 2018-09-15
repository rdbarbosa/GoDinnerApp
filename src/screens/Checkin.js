import React from "react";
import { Text, Container, Header, Content, Button } from "native-base";
import Navigation from "../components/Navigation";
import RNCamera from "react-native-camera";
import CustomHeader from "../components/CustomHeader"
class Checkin extends React.Component {
    onRead = e => {
        console.log(`leu`, e);
    };
    render() {
        return (
            <Container>
                <CustomHeader 
                  iconLeft={{name:'md-menu'}}
                  iconRight={{name: 'location', type: "Entypo"}}
                  title={"Check-in"}
                />
                <Content>
                    <RNCamera
                        style={{ flex: 1, height: 600 }}
                        fixOrientation={true}
                        barCodeTypes={["org.iso.QRCode"]}
                        onBarCodeRead={this.onRead}
                    />
                </Content>
                <Navigation />
            </Container>
        );
    }
}

export default Checkin;
