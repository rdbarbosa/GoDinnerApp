import React from "react";
import { Text, Container,  Content,  View  } from "native-base";
import Navigation from "../components/Navigation";
import RNCamera from "react-native-camera";
import CustomHeader from "../components/CustomHeader";
class Checkin extends React.Component {
  onRead = e => {
    console.log(`leu`, e);
  };
  render() {
    return (
      <Container>
        <CustomHeader
          iconLeft={{ name: "md-menu" }}
          iconRight={{ name: "location", type: "Entypo" }}
          title={"Check-in"}
        />
        <Content>
          <RNCamera
            style={{ flex: 1, height: 600 }}
            fixOrientation={true}
            barCodeTypes={["org.iso.QRCode"]}
            onBarCodeRead={this.onRead}
          />
          <View
            style={{
              flex: 1,
              height: 600,
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0, 
              borderWidth: 50,
              borderBottomWidth: 100,
              borderTopWidth: 100,
              borderColor: "rgba(0,0,0,.7)"
            }}
          >
            <View
              style={{
                flex: 1,
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                borderWidth: 1.5,
                borderColor: "#007aff"
              }} 
            />
          </View>
          <View style={{position: 'absolute', flex: 1, bottom: 40, left: 0, right: 0}}>
              <Text style={{textAlign: 'center', color: 'white'}}>Escaneie o QR Code de sua mesa para iniciar o pedido</Text>
          </View>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

export default Checkin;
