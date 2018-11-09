import React from "react";
import { withRouter } from "react-router";
import { FlatList } from "react-native";
import { GET_ORDERS } from "../graphql/Orders";
import { Container, Content, View, Text, Left, Right } from "native-base";
import Navigation from "../components/Navigation";
import CustomHeader from "../components/CustomHeader";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { SimpleAnimation } from "react-native-simple-animations";
import moment from "moment";
class Orders extends React.Component {
  state = {
    orders: []
  };
  componentWillMount() {
    const { client } = this.props;
    client
      .query({
        query: GET_ORDERS
      })
      .then(({ data }) => {
        // console.warn(data.client[0].orders);
        this.setState({ orders: data.client[0].orders });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <Container>
        <CustomHeader
          iconLeft={{ name: "md-menu" }}
          iconRight={{ name: "location", type: "Entypo" }}
          title={"GoDinner"}
        />
        <Content style={{ backgroundColor: "#f6f6f6", marginTop: 15 }}>
          <Text style={{ padding: 10 }} note>
            Voce fez {this.state.orders.length} pedidos no GoDinner
          </Text>
          <FlatList
            style={{ width: "100%" }}
            keyExtractor={item => item.id.toString()}
            data={this.state.orders}
            renderItem={({
              item: { id, restaurant, created_at, star, menu_options },
              index
            }) => (
              <SimpleAnimation
                duration={1000}
                movementType="slide"
                direction="left"
                distance={(index + 1) * 200}
                useNativeDriver={true}
              >
                <View
                  style={{ backgroundColor: "white", margin: 10, padding: 10 }}
                >
                  <View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                      <Text>
                        {id} - {restaurant.name}
                      </Text>
                      <Text note>
                        Total: R${" "}
                        {menu_options
                          .reduce((acc, value) => {
                            return acc + value.price;
                          }, 0)
                          .toFixed(2)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text note> {created_at} </Text>
                      <Text note> {star} </Text>
                    </View>
                  </View>
                </View>
              </SimpleAnimation>
            )}
          />
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  // token: state.token,
  // restaurants: state.restaurants
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ ...RestaurantActions, ...ClientActions }, dispatch);

export default connect(
  mapStateToProps,
  {} // mapDispatchToProps
)(withApollo(withRouter(Orders)));
