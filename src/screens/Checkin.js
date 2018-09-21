import React from "react";
import { Text, Container, Content, View } from "native-base";
import Navigation from "../components/Navigation";
import RNCamera from "react-native-camera";
import CustomHeader from "../components/CustomHeader";
import { withApollo } from "react-apollo";
import { READ_QR } from "../graphql/QRCode";
import CustomToast from "../components/CustomToast";
import { debounce } from "lodash";
import { withRouter } from "react-router";
class Checkin extends React.Component {
    camera = {};

    state = {
        read: false
    };

    componentWillMount() {}
    onRead = async e => {
        // this.camera.stopPreview();
        if (this.state.read === true) return;
        this.setState({ read: true });
        try {
            const { data } = await this.props.client.query({
                query: READ_QR,
                variables: { qr_code: e.data }
            });
            console.log("passou aqui", data);
            const {name, qr_code_table} = data.restaurant[0]
            CustomToast({
                text: `Bem vindo ao ${name}, mesa: ${qr_code_table.table_number} `,
                type: "success"
            });
            this.props.history.push("/order");
        } catch (error) {
            CustomToast({
                text: "Ocorreu um erro ao tentar ler, tente novamente",
                type: "danger"
            });
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
                            <Text
                                style={{ textAlign: "center", color: "white" }}
                            >
                                Escaneie o QR Code de sua mesa para iniciar o
                                pedido
                            </Text>
                        </View>
                    </RNCamera>
                </Content>
                <Navigation />
            </Container>
        );
    }
}

export default withRouter(withApollo(Checkin));
