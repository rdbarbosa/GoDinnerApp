import React from "react";
import { Text, Container, Content, View } from "native-base";
import Navigation from "../components/Navigation";
import RNCamera from "react-native-camera";
import CustomHeader from "../components/CustomHeader";
import { withApollo } from "react-apollo";
import { READ_QR } from "../graphql/QRCode";
import CustomToast from "../components/CustomToast";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { Creators as OrderActions } from "../store/ducks/order";

class Checkin extends React.Component {
  camera = {};

  state = {
    read: false
  };

  async componentDidMount() {
    /**
     * #DEBUG
     */
    // setTimeout(async () => {
    //   try {
    //     const { data } = await this.props.client.query({
    //       query: READ_QR,
    //       fetchPolicy: "no-cache",
    //       variables: {
    //         qr_code:
    //           "$2y$10$QPIqboTpdCpiEoqBSlyDOu4eWZmkTOxY9wsnKk8u6JwPZW6EGE/uW"
    //       }
    //     });
    //     console.log("passou aqui", data);
    //     const { name, qr_code_table } = data.restaurant[0];
    //     CustomToast({
    //       text: `Bem vindo ao ${name}, você está na mesa: ${
    //         qr_code_table.table_number
    //       } `,
    //       type: "success",
    //       duration: 4000
    //     });
    //     this.props.updateOrder({
    //       ...this.props.order,
    //       client: this.props.currentClient,
    //       restaurant_table: qr_code_table,
    //       restaurant: data.restaurant[0],
    //       menu_options: [],
    //     });
    //     this.props.updateType("ORDERING");
    //     this.props.history.push("/order");
    //   } catch (error) {
    //     if (error.graphQLErrors[0]) {
    //       CustomToast({
    //         text: error.graphQLErrors[0].message,
    //         type: "danger",
    //         duration: 3000
    //       });
    //     }
    //     return;
    //   }
    // }, 300);
    /**
     *
     */
  }
  onRead = async e => {
    // this.camera.stopPreview();
    if (this.state.read === true) return;
    this.setState({ read: true });
    try {
      const { data } = await this.props.client.query({
        query: READ_QR,
        fetchPolicy: "no-cache",
        variables: {
          qr_code: e.data
        }
      });
      console.log("passou aqui", data);
      const { name, qr_code_table } = data.restaurant[0];
      CustomToast({
        text: `Bem vindo ao ${name}, você está na mesa: ${
          qr_code_table.table_number
        } `,
        type: "success",
        duration: 4000
      });
      this.props.updateOrder({
        ...this.props.order,
        client: this.props.currentClient,
        restaurant_table: qr_code_table,
        restaurant: data.restaurant[0],
        menu_options: []
      });
      this.props.updateType("ORDERING");
      this.props.history.push("/order");
    } catch (error) {
      this.setState({ read: false });
      if (error.graphQLErrors[0]) {
        CustomToast({
          text: error.graphQLErrors[0].message,
          type: "danger",
          duration: 3000
        });
      }
      return;
    }

    // console.warn(`leu`, e);
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
            style={{
              flex: 1,
              flexDirection: "column",
              height: 550
            }}
            fixOrientation={true}
            barCodeTypes={["org.iso.QRCode"]}
            onBarCodeRead={this.onRead}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
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
            <View
              style={{
                position: "absolute",
                flex: 1,
                bottom: 40,
                left: 0,
                right: 0
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Escaneie o QR Code de sua mesa para iniciar o pedido
              </Text>
            </View>
          </RNCamera>
        </Content>
        <Navigation />
      </Container>
    );
  }
}
const mapStateToProps = ({ order, client }) => ({
  order,
  currentClient: client
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(OrderActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withApollo(Checkin)));
