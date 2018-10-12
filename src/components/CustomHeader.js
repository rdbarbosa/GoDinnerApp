import React from "react";
import { withRouter } from "react-router";

import { Header, Left, Button, Icon, Right, Title, Body } from "native-base";
const CustomHeader = ({ iconLeft, title, iconRight, history }) => (
  <Header>
    {iconLeft && (
      <Left>
        <Button transparent>
          {/* <Icon name="md-menu" /> */}
          <Icon {...iconLeft} />
        </Button>
      </Left>
    )}
    <Body>
      <Title>{title}</Title>
    </Body>
    {iconRight && (
      <Right>
        <Button transparent>
          {/* <Icon name="location" type="Entypo" /> */}
          <Icon onPress={() => history.push("/map")} {...iconRight}  />
        </Button>
      </Right>
    )}
  </Header>
);

export default withRouter(CustomHeader);
