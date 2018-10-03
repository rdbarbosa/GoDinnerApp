import React from "react";
import { ListView } from "react-native";
import {
  Text,
  Container,
  Content,
  View,
  H3,
  Tabs,
  ScrollableTab,
  Tab,
  List,
  ListItem,
  Button,
  Icon,
  Body,
  Right
} from "native-base";
import Navigation from "../components/Navigation";
import CustomHeader from "../components/CustomHeader";
import { withRouter } from "react-router-native";
import { get } from "lodash";
import RestaurantCard from "../components/RestaurantCard";
import { connect } from "react-redux";
import { Creators as OrderActions } from "../store/ducks/order";
import { bindActionCreators } from "redux";

class Order extends React.Component {
  componentDidMount() {
    console.log(this.props);
    let restaurant = null;
    let table = null;
    if (this.props.order.restaurant.id) {
      restaurant = this.props.order.restaurant;
      table = this.props.order.table;
    } else if (this.props.location.state) {
      restaurant = get(this.props, "location.state.restaurant");
      table = get(this.props, "location.state.qr_code_table");
    }

    if (restaurant) {
      this.setState({ restaurant });
      this.updateOrder(restaurant, table);
    }
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  state = {
    restaurant: {}
  };

  updateOrder(restaurant, table) {
    if (restaurant) {
      this.props.updateOrder({
        client: this.props.client,
        restaurant_table: table,
        restaurant,
        ...this.props.order
      });
    }
  }
  render() {
    return (
      <Container>
        <CustomHeader
          iconLeft={{ name: "md-menu" }}
          iconRight={{ name: "location", type: "Entypo" }}
          title={"Pedidos"}
        />
        <Content style={{ backgroundColor: "#f6f6f6" }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this.state.restaurant.id ? (
              <View
                style={{
                  width: "100%"
                }}
              >
                <RestaurantCard
                  key={this.state.restaurant.id}
                  thumb={{ uri: this.state.restaurant.avatar_url }}
                  name={this.state.restaurant.name}
                  desc="Lancheria"
                  style={{ marginLeft: 0, width: "100%" }}
                  time={{
                    open: "18:00",
                    close: "00:00"
                  }}
                  avaliation={3}
                />
                <View>
                  {this.state.restaurant.menus && (
                    <Tabs renderTabBar={() => <ScrollableTab />}>
                      {this.state.restaurant.menus.map(
                        ({ type, id, menu_options }, index) => (
                          <Tab
                            heading={type}
                            key={`menu_${id}`}
                            tabStyle={{ borderColor: "transparent" }}
                          >
                            <List>
                              {menu_options.map(
                                ({ id, ingredients, name, price }, index) => (
                                  <ListItem thumbnail key={`options_${id}`}>
                                    <Body>
                                      <Text>{name}</Text>
                                      <Text note numberOfLines={2}>
                                        {ingredients}
                                      </Text>
                                      <Text note numberOfLines={2}>
                                        {Number(price).toLocaleString("pt-BR", {
                                          currency: "BRL",
                                          style: "currency"
                                        })}
                                      </Text>
                                    </Body>
                                    <Right
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center"
                                      }}
                                    >
                                      <Button
                                        transparent
                                        onPress={() => this.props.addOption(id)}
                                      >
                                        <Icon active name="ios-add-outline" />
                                      </Button>
                                      <Text>
                                        {
                                          this.props.order.menu_options.filter(
                                            option => option === id
                                          ).length
                                        }
                                      </Text>
                                      <Button
                                        transparent
                                        onPress={() =>
                                          this.props.removeOption(id)
                                        }
                                      >
                                        <Icon
                                          active
                                          name="ios-remove-outline"
                                        />
                                      </Button>
                                    </Right>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Tab>
                        )
                      )}
                    </Tabs>
                  )}
                </View>
                <View>
                  <Button full primary>
                    <Text>Realizar Pedido</Text>
                  </Button>
                </View>
              </View>
            ) : (
              <H3 style={{ textAlign: "center" }}>
                Leia o QR Code da mesa para iniciar o pedido
              </H3>
            )}
          </View>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = ({ order, client }) => ({
  order,
  client
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(OrderActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Order));
