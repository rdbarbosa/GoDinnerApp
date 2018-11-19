import React from "react";
import {
  View,
  Content,
  Container,
  Thumbnail,
  H1,
  H2,
  Text,
  H3,
  Tabs,
  ScrollableTab,
  Tab,
  Card,
  CardItem,
  Left,
  Body,
  Button,
  Icon,
  Image,
  ListItem,
  List,
  Right,
  Grid,
  Row,
  Col
} from "native-base";
import { withRouter } from "react-router-native";
import CustomHeader from "../components/CustomHeader";
import Navigation from "../components/Navigation";
import HTMLView from "react-native-htmlview";
import moment from "moment";
import { LIKE_POST } from "../graphql/ShowRestaurant";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import "moment/locale/pt-br";
import { withApollo } from "react-apollo";
import { fetchRestaurants } from "../graphql/Home";
moment.locale("pt-br");

class ShowRestaurant extends React.Component {
  state = {
    restaurant: {
      user: {},
      posts: [],
      menus: [],
      tables: [],
      orders: []
    },
    postsLikeds: []
  };
  componentDidMount() {
    this.setState({ restaurant: this.props.location.state.restaurant });
  }
  getCurtidas(likes, id) {
    let numLikes = likes.reduce((acc, value) => {
      return acc + 1;
    }, 0);
    if (this.state.postsLikeds.find(post => post === id)) {
      numLikes++;
    }

    return numLikes > 1 ? `${numLikes} curtidas` : `${numLikes} curtida`;
  }

  async likePost(id) {
    const { client } = this.props;
    try {
      const { data } = await client.mutate({
        mutation: LIKE_POST,
        refetchQueries: [{ query: fetchRestaurants }],
        variables: {
          post_id: id
        }
      });

      if (data.likeUpdate) {
        this.setState({ postsLikeds: [...this.state.postsLikeds, id] });
      } else {
        this.setState({
          postsLikeds: this.state.postsLikeds.filter(postId => postId !== id)
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const {
      name,
      subname,
      location,
      number,
      phone_number,
      cellphone_number,
      avatar_url,
      description,
      user: { email },
      posts,
      menus,
      tables,
      orders
    } = this.state.restaurant;
    // console.warn(posts);
    // console.warn(menus);
    // console.warn(tables);
    // console.warn(orders)
    return (
      <Container>
        <CustomHeader
          iconLeft={{
            type: "Entypo",
            name: "chevron-thin-left",
            onPress: () => this.props.history.push("/home")
          }}
          title={`${name} ${subname != "" ? subname : ""}`}
        />
        <Content style={{ backgroundColor: "white" }}>
          <Thumbnail
            square
            style={{ width: "100%", height: 200 }}
            source={{ uri: avatar_url }}
          />
          <Tabs pose="open" renderTabBar={() => <ScrollableTab />}>
            <Tab
              heading={"Postagens"}
              key={`tab_1`}
              tabStyle={{ borderColor: "transparent" }}
            >
              {posts.map(
                (
                  {
                    id,
                    title,
                    content,
                    likes,
                    comments,
                    image_url,
                    created_at
                  },
                  index
                ) => (
                  <Card style={{ flex: 0 }} key={`posts_${index}`}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{ uri: avatar_url }} />
                        <Body>
                          <Text>
                            {name} {subname}
                          </Text>
                          <Text note>{moment(created_at).fromNow()}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Thumbnail
                          source={{ uri: image_url }}
                          square
                          style={{ height: 200, width: "100%", flex: 1 }}
                        />
                        <H2 style={{ marginTop: 10, marginBottom: 10 }}>
                          {title}
                        </H2>
                        <HTMLView value={content} />
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button
                          transparent
                          textStyle={{ color: "black" }}
                          onPress={() => this.likePost(id)}
                        >
                          <Icon name="thumbs-up" />
                          <Text>{this.getCurtidas(likes, id)}</Text>
                        </Button>
                      </Left>
                    </CardItem>
                  </Card>
                )
              )}
            </Tab>
            <Tab
              heading={"Cardápio"}
              key={`tab_2`}
              tabStyle={{ borderColor: "transparent" }}
            >
              <List>
                {menus.map(({ type, menu_options }) => (
                  <React.Fragment key={`menu_${type}`}>
                    <ListItem itemHeader first >
                      <Text>{type}</Text>
                    </ListItem>
                    {menu_options.map(({ price, name, ingredients }) => (
                      <ListItem key={`option_${name}`}>
                        <Body>
                          <Text>{name}</Text>
                          <Text note>{ingredients}</Text>
                        </Body>
                        <Right>
                          <Text note>
                            R${" "}
                            {Number(price)
                              .toFixed(2)
                              .replace(".", ",")}
                          </Text>
                        </Right>
                      </ListItem>
                    ))}
                  </React.Fragment>
                ))}
              </List>
            </Tab>
            <Tab
              heading={"Mesas disponíveis"}
              key={`tab_3`}
              tabStyle={{ borderColor: "transparent" }}
            >
              <FlatList
                data={tables}
                keyExtractor={item => item.id}
                numColumns={3}
                renderItem={({ item: { table_number, id, state } }) => {
                  return (
                    <Card
                    
                      style={{
                        backgroundColor: state === "Ocupada" ? "#ef5350" : "#81c784",
                        margin: 10,
                        height: 150
                      }}
                    >
                      <CardItem>
                        <Body>
                          <Text>Mesa {table_number}</Text>
                          <Text note>{state}</Text>
                        </Body>
                      </CardItem>
                    </Card>
                  );
                }}
              />
            </Tab>
            <Tab
              heading={"Informações"}
              key={`tab_4`}
              tabStyle={{ borderColor: "transparent" }}
            >
              <View style={{ padding: 10 }}>
                <Text note style={{ marginBottom: 10 }}>
                  {description}
                </Text>
                <Text>Telefone: {phone_number}</Text>
                <Text>Celular: {cellphone_number}</Text>
                <Text>Endereço: {location}, {number}</Text>
              </View>
            </Tab>
          </Tabs>
        </Content>
        <Navigation />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  clientUser: state.client
});

//   const mapDispatchToProps = dispatch =>
//     bindActionCreators(ClientActions, dispatch);

export default connect(
  mapStateToProps,
  {}
  // mapDispatchToProps
)(withApollo(withRouter(ShowRestaurant)));
