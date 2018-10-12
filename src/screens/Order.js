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
  Right,
  Footer,
  Left
} from "native-base";
import Navigation from "../components/Navigation";
import CustomHeader from "../components/CustomHeader";
import { withRouter } from "react-router-native";
import { get } from "lodash";
import RestaurantCard from "../components/RestaurantCard";
import { connect } from "react-redux";
import { Creators as OrderActions } from "../store/ducks/order";
import { bindActionCreators } from "redux";
import { SimpleAnimation } from "react-native-simple-animations";
import { Mutation } from "react-apollo";
import { ADD_ORDER } from "../graphql/Order";

class Order extends React.Component {
  componentDidMount() {
    console.log(this.props);
    if (this.props.order.order_type === "ORDERING") {
      let restaurant = this.props.order.restaurant;
      this.setState({ restaurant });
    }
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  state = {
    restaurant: {}
  };

  updateOrder(restaurant, table) {
    this.props.updateOrder({
      ...this.props.order,
      client: this.props.client,
      restaurant_table: table,
      restaurant
    });
    this.props.updateType({
      type: "ORDERING"
    });
  }
  async addOrder(mutation) {
    await mutation();
    this.props.updateType("ORDERED");
    this.props.history.push("/order/success");
    this.props.clearOrder()
  }
  closeOrder() {
    this.props.clearOrder()
    this.props.updateType("")
    this.props.history.push("/home");

  }
  render() {
    return (
      <Container>
        <CustomHeader
          iconLeft={{
            type: "Entypo",
            name: "chevron-thin-left",
            onPress: () => this.props.history.push("/home")
          }}
          iconRight={this.props.order.order_type === "ORDERING" && { name: "md-close", type: "Ionicons", onPress: () => this.closeOrder() }}
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
                    <Tabs pose="open" renderTabBar={() => <ScrollableTab />}>
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
                                  <SimpleAnimation
                                    duration={600}
                                    movementType="slide"
                                    direction="left"
                                    distance={(index + 1) * 200}
                                    useNativeDriver={true}
                                    key={`options_${id}`}
                                  >
                                    <ListItem thumbnail key={`options_${id}`}>
                                      <Left />
                                      <Body>
                                        <Text>{name}</Text>
                                        <Text note numberOfLines={2}>
                                          {ingredients}
                                        </Text>
                                        <Text note numberOfLines={2}>
                                          {Number(price).toLocaleString(
                                            "pt-BR",
                                            {
                                              currency: "BRL",
                                              style: "currency"
                                            }
                                          )}
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
                                          onPress={() =>
                                            this.props.addOption(id)
                                          }
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
                                  </SimpleAnimation>
                                )
                              )}
                            </List>
                          </Tab>
                        )
                      )}
                    </Tabs>
                  )}
                </View>
                <View style={{ marginTop: 70 }} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  height: 600,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <H3 style={{ textAlign: "center" }}>
                  Leia o QR Code da mesa para iniciar o pedido
                </H3>
              </View>
            )}
          </View>
        </Content>
        {this.props.order.menu_options.length > 0 && (
          <Footer>
            <Mutation
              mutation={ADD_ORDER}
              variables={{
                client_id: this.props.order.client.id,
                restaurant_id: this.props.order.restaurant.id,
                restaurant_tables_id: this.props.order.restaurant_table.id,
                menu_options: this.props.order.menu_options
              }}
            >
              {(ADD_ORDER, { data }) => (
                <View>
                  <SimpleAnimation
                    movementType="slide"
                    direction="up"
                    distance={200}
                    duration={500}
                    useNativeDriver={true}
                  >
                    <Button
                      onPress={() => this.addOrder(ADD_ORDER)}
                      full
                      primary
                      style={{ width: "100%" }}
                    >
                      <Text>Realizar Pedido</Text>
                    </Button>
                  </SimpleAnimation>
                </View>
              )}
            </Mutation>
          </Footer>
        )}
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
