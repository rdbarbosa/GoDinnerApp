import React from "react";
import {
  Text,
  View,
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Left
} from "native-base";
import { Query } from "react-apollo";
import CustomHeader from "../components/CustomHeader";
import Navigation from "../components/Navigation";
import { withRouter } from "react-router-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as OrderActions } from "../store/ducks/order";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");
class Ordered extends React.Component {
  render() {
    return (
      <Container>
        <CustomHeader
          iconLeft={{
            type: "Entypo",
            name: "chevron-thin-left",
            onPress: () => this.props.history.push("/home")
          }}
          title={"Pedidos"}
        />
        <Content style={{ backgroundColor: "white", padding: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Left>
              <Text>Pedido:</Text>
            </Left>
            <Right>
              <Text note>{moment(this.props.order.created_at).fromNow()}</Text>
              <Text>Total: R$ {Number(this.props.order.total).toFixed(2)}</Text>
            </Right>
          </View>
          <List style={{ marginBottom: 200 }}>
            {this.props.order.menu_options.map(
              ({ price, name, ingredients }, index) => (
                <ListItem
                  key={`order_options_${index}`}
                  style={{ marginLeft: -20 }}
                >
                  <Body style={{ paddingLeft: 20 }}>
                    <Text>{name}</Text>
                    <Text note>{ingredients}</Text>
                  </Body>
                  <Right>
                    <Text note>R$ {price.toFixed(2, ',')}</Text>
                  </Right>
                </ListItem>
              )
            )}
          </List>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = ({ order, client }) => ({
  order,
  clientUser: client
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(OrderActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Ordered));
