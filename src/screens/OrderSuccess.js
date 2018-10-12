import React from "react";
import { Container, Content, Text, Icon, View, H1, H2 } from "native-base";
import CustomHeader from "../components/CustomHeader";
import { SimpleAnimation } from "react-native-simple-animations";
import { withRouter } from "react-router-native";
const OrderSuccess = ({ history }) => (
  <Container>
    <CustomHeader
      iconLeft={{
        type: "Entypo",
        name: "chevron-thin-left",
        onPress: () => history.push("/home")
      }}
      title={"Pedidos"}
    />
    <Content>
      <View
        style={{
          width: "100%",
          height: 600,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 40,
          paddingRight: 40
        }}
      >
        <SimpleAnimation
          movementType="slide"
          direction="down"
          distance={200}
          fade
          duration={1000}
          useNativeDriver={true}
        >
          <Icon
            type="Ionicons"
            style={{ color: "#28a745", fontSize: 67 }}
            name={"ios-checkmark-circle-outline"}
          />
        </SimpleAnimation>
        <SimpleAnimation
          movementType="slide"
          direction="up"
          distance={200}
          fade
          duration={1000}
          useNativeDriver={true}
        >
          <H2 style={{ textAlign: "center" }}>
            Seu pedido foi realizado com sucesso!
          </H2>
        </SimpleAnimation>
      </View>
    </Content>
  </Container>
);

export default withRouter(OrderSuccess);
