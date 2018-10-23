import React from "react";
import { StyleSheet } from "react-native";

import { CardItem, Left, Thumbnail, Body, Right, Text, Icon, Card } from "native-base";

const RestaurantCard = ({ name, desc, time = {}, avaliation = 0, thumb, style = {} }) => (
  <Card style={{elevation: 0, width: "93%", borderColor: 'white', marginLeft: "3.5%", ...style}}>
    <CardItem>
      <Left>
        <Thumbnail source={thumb} />
        <Body>
          <Text>{name}</Text>
          <Text note>{desc}</Text>
        </Body>
      </Left>
      <Right>
        <Text note>
          {time.open} até {time.close}
        </Text>
      </Right>
    </CardItem>
    <CardItem style={{ marginTop: -15 }}>
      <Icon style={styles.heartIcon} type="FontAwesome" name={avaliation >= 1 ? "star" : "star-o"} />
      <Icon style={styles.heartIcon} type="FontAwesome" name={avaliation >= 2 ? "star" : "star-o"} />
      <Icon style={styles.heartIcon} type="FontAwesome" name={avaliation >= 3 ? "star" : "star-o"} />
      <Icon style={styles.heartIcon} type="FontAwesome" name={avaliation >= 4 ? "star" : "star-o"} />
      <Icon style={styles.heartIcon} type="FontAwesome" name={avaliation >= 5 ? "star" : "star-o"} />
    </CardItem>
  </Card>
);

const styles = StyleSheet.create({
    heartIcon: {
      fontSize: 15,
      color: "#ffca27",
      width: 17
    }
  });
export default RestaurantCard