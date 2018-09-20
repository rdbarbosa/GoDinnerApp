import React from "react";
import { Text, Container, Header, Content, View, Thumbnail, Button, Icon, H1, H3, Image } from "native-base";
import { ImageBackground } from 'react-native'
import Navigation from "../components/Navigation";
import CustomHeader from "../components/CustomHeader"
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ClientActions } from '../store/ducks/client'
class Perfil extends React.Component {
  formatCel(number) {
    return `(${number.substring(0, 2)}) ${number.substring(2, 7)}-${number.substring(7)}`
  }
  render() {
    const { client } = this.props
    return (

      <Container>
        <CustomHeader
          iconLeft={{ name: 'md-menu' }}
          iconRight={{ name: 'location', type: "Entypo" }}
          title={"Perfil"}
        />
        <Content>
          <View style={{ flexDirection: 'column', flex: 1, height: 600, alignItems: 'center', marginTop: 70 }}>
            <View style={{ elevation: 1, zIndex: -1, backgroundColor: 'white', paddingTop: 50, paddingLeft: 20, paddingRight: 20, paddingBottom: 50 }}>
              <View style={{ elevation: 1, zIndex: 5, width: 300, alignItems: 'center' }}>
                <Button small rounded style={{ width: 50, height: 50, position: 'absolute', left: 40, top: 50 }}>
                  <Icon name="camera" fontSize="16" />
                </Button>
                <Thumbnail large style={{ zIndex: 3, borderWidth: 2, width: 150, height: 150, borderRadius: 75, borderColor: 'rgba(0,0,0,.2)' }} source={{ uri: client.avatar_url === "" ? `https://ui-avatars.com/api/?size=128&background=5489FF&color=fff&name=${client.name}+${client.lastname}` : client.avatar_url }} />
                <Button small rounded style={{ width: 50, height: 50, position: 'absolute', right: 40, top: 50 }}>
                  <Icon name="ios-images" fontSize="16" />
                </Button>
              </View>
              <View style={{ marginTop: 15, alignItems: 'center' }}>
                <H1>{client.name} {client.lastname}</H1>
              </View>
              <View style={{ marginTop: 15, alignItems: 'center' }}>
                <Text style={{ color: '#787878' }}>Telefone</Text>
                <H3 style={{ marginTop: 5 }}>{this.formatCel(client.phone_number)}</H3>
              </View>
              <View style={{ marginTop: 15, alignItems: 'center' }}>
                <Text style={{ color: '#787878' }}>E-mail</Text>
                <H3 style={{ marginTop: 5 }}>{client.user.email}</H3>
              </View>
            </View>
          </View>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ClientActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Perfil));