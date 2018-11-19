import React from "react";
import {
  Text,
  Container,
  Header,
  Content,
  View,
  Thumbnail,
  Button,
  Icon,
  H1,
  H3,
  Image
} from "native-base";
import { CameraRoll, PermissionsAndroid } from "react-native";
import Navigation from "../components/Navigation";
import CustomHeader from "../components/CustomHeader";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ClientActions } from "../store/ducks/client";
import ImagePicker from "react-native-image-picker";
import firebase from "../firebase";
import CustomToast from "../components/CustomToast";
import { withApollo } from "react-apollo";
import { ALTER_AVATAR } from "../graphql/Perfil";
import axios from "axios";
const storageRef = firebase.storage().ref();
const imagesRef = storageRef.child("images");

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const Base64 = {
  atob: (input = "") => {
    let str = input.replace(/=+$/, "");
    let output = "";

    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  var sliceSize = 1024;
  var byteCharacters = Base64.atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);

    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

class Perfil extends React.Component {
  state = {
    img: null
  };
  formatCel(number) {
    return `(${number.substring(0, 2)}) ${number.substring(
      2,
      7
    )}-${number.substring(7)}`;
  }

  openCameraRoll = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Permissão para ler fotos",
        message: `GoDinner precisa acessar sua galeria para você poder subir sua foto de perfil`
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return;
    }
    const options = {
      title: "Selecione seu avatar",
      allowEditing: true,
      chooseFromLibraryButtonTitle: "Escolher da galeria",
      takePhotoButtonTitle: "Tirar foto"
    };
    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const formData = new FormData();
        formData.append("image", {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          size: response.fileSize
        });
        try {
          const { path } = await (await fetch(
            "https://godinner-backend.herokuapp.com/api/upload-image",
            {
              method: "POST",
              body: formData,
              headers: {
                "Content-type": "multipart/form-data",
                Accept: "application/json"
              }
            }
          )).json();
          const { data } = await this.props.client.mutate({
            mutation: ALTER_AVATAR,
            variables: {
              avatar_url: path,
              id: 0
            }
          });
          this.props.updateClient({
            ...this.props.clientUser,
            avatar_url: data.clientUpdate.avatar_url
          });
          CustomToast({
            text: "Imagem de perfil atualizada com sucesso",
            type: "success",
            position: "bottom"
          });
        } catch (e) {
          console.error(e);
        }
      }
    });
  };
  getAvatar(client) {
    if (client.avatar_url === "" && !this.state.img) {
      return `https://ui-avatars.com/api/?size=128&background=5489FF&color=fff&name=${
        client.name
      }+${client.lastname}`;
    } else if (client.avatar_url !== "" && !this.state.img) {
      return client.avatar_url;
    } else {
      return this.state.img;
    }
  }
  render() {
    const { clientUser } = this.props;
    return (
      <Container>
        <CustomHeader
          iconLeft={{ name: "md-menu" }}
          iconRight={{ name: "location", type: "Entypo" }}
          title={"Perfil"}
        />
        <Content>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              alignItems: "center",
              marginTop: 70
            }}
          >
            <View
              style={{
                elevation: 1,
                zIndex: -1,
                backgroundColor: "white",
                paddingTop: 50,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 50
              }}
            >
              <View
                style={{
                  elevation: 1,
                  zIndex: 5,
                  width: 300,
                  alignItems: "center"
                }}
              >
                <Thumbnail
                  large
                  style={{
                    zIndex: 3,
                    borderWidth: 2,
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    borderColor: "rgba(0,0,0,.2)"
                  }}
                  source={{
                    uri: this.getAvatar(clientUser)
                  }}
                />
                <Button
                  small
                  onPress={this.openCameraRoll}
                  rounded
                  style={{
                    width: 50,
                    height: 50,
                    position: "absolute",
                    right: 40,
                    top: 50
                  }}
                >
                  <Icon name="ios-images" fontSize="16" />
                </Button>
              </View>
              <View style={{ marginTop: 15, alignItems: "center" }}>
                <H1>
                  {clientUser.name} {clientUser.lastname}
                </H1>
              </View>
              <View style={{ marginTop: 15, alignItems: "center" }}>
                <Text style={{ color: "#787878" }}>Telefone</Text>
                <H3 style={{ marginTop: 5 }}>
                  {this.formatCel(clientUser.phone_number)}
                </H3>
              </View>
              <View style={{ marginTop: 15, alignItems: "center" }}>
                <Text style={{ color: "#787878" }}>E-mail</Text>
                <H3 style={{ marginTop: 5 }}>{clientUser.user.email}</H3>
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
  clientUser: state.client
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ClientActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(withRouter(Perfil)));
