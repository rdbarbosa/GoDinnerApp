import React from "react";
import { Text, Container, Header, Content, Button } from "native-base";
import Navigation from "../components/Navigation";
import RNCamera from "react-native-camera";
class Checkin extends React.Component {
  componentDidMount() {
    console.log(RNCamera.constants)
  }
  onRead = (e) => {
    console.log(`leu`, e)
  }
  render() {
    return (
    <Container>
        <Header></Header>
        <Content> 
             <RNCamera 
                  style={{flex: 1,height: 600}}
                  fixOrientation={true}
                  barCodeTypes={['org.iso.QRCode']}
                  onBarCodeRead={this.onRead}
             ></RNCamera>
        </Content>
      <Navigation />
    </Container>
    );
  }
}

export default Checkin;
